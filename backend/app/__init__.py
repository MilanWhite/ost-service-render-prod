import os
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman
from werkzeug.middleware.proxy_fix import ProxyFix

from app.config import Config, ProductionConfig
from app.extensions import db, migrate
from app.contact.routes import contact_bp
from app.admin.routes import admin_bp
from app.main.routes   import main_bp

def create_app():
    app = Flask(__name__, instance_relative_config=False)

    # Dynamically pick config
    if os.getenv("FLASK_ENV") == "production":
        app.config.from_object(ProductionConfig)
    else:
        app.config.from_object(Config)

    # Database
    db.init_app(app)
    migrate.init_app(app, db)

    # Reverse proxy headers, neccessary for Vercel
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

    # CORS!!!
    CORS(
        app,
        supports_credentials=True,
        resources={r"/api/*": {"origins": [Config.FRONTEND_URL]}},
    )

    # Talisman
    csp = {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:"],
    }
    Talisman(
        app,
        force_https=True,
        strict_transport_security=True,
        strict_transport_security_max_age=31536000,
        strict_transport_security_include_subdomains=True,
        frame_options="DENY",
        content_security_policy=csp,
    )

    # Blooprints
    app.register_blueprint(contact_bp, url_prefix="/api/contact")

    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    app.register_blueprint(main_bp, url_prefix="/api/main")

    with app.app_context():
        db.create_all()

        print("\n–– Registered Blueprints ––")
        for name, bp in app.blueprints.items():
            print(f"{name!r} → prefix={bp.url_prefix}")
        print("–––––––––––––––––––––––––––\n")

        print("\n–– URL Map ––")
        for rule in app.url_map.iter_rules():
            methods = ",".join(sorted(rule.methods - {"HEAD","OPTIONS"}))
            print(f"{rule.rule:<30s} → methods[{methods}]")
        print("–––––––––––––––––––––––––––\n")

    return app