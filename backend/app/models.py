from app.extensions import db

print(type(db))

from datetime import datetime, timezone

class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id                   = db.Column(db.Integer,   primary_key=True)
    vehicle_name         = db.Column(db.String(100), nullable=False, default="")
    lot_number           = db.Column(db.String(50),  nullable=False)
    auction_name         = db.Column(db.String(100), nullable=False)
    location             = db.Column(db.String(100), nullable=False)
    shipping_status      = db.Column(db.String(50),  nullable=False)
    price_delivery       = db.Column(db.Numeric(10,2), nullable=False, default=0)
    price_shipping       = db.Column(db.Numeric(10,2), nullable=False, default=0)
    cognito_sub          = db.Column(db.String(36),  nullable=False)
    user_email           = db.Column(db.String(100), nullable=False)
    created_at           = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # new fields
    container_number     = db.Column(db.String(20), nullable=True)
    port_of_origin       = db.Column(db.String(100), nullable=True)
    port_of_destination  = db.Column(db.String(100), nullable=True)
    delivery_address     = db.Column(db.Text,        nullable=True)
    receiver_id          = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id":                   self.id,
            "vehicle_name":         self.vehicle_name,
            "lot_number":           self.lot_number,
            "auction_name":         self.auction_name,
            "location":             self.location,
            "shipping_status":      self.shipping_status,
            "price_delivery":       float(self.price_delivery),
            "price_shipping":       float(self.price_shipping),
            "cognito_sub":          self.cognito_sub,
            "user_email":           self.user_email,
            "created_at":           self.created_at.isoformat(),
            # new fields
            "container_number":     self.container_number,
            "port_of_origin":       self.port_of_origin,
            "port_of_destination":  self.port_of_destination,
            "delivery_address":     self.delivery_address,
            "receiver_id":          self.receiver_id,
        }

class User(db.Model):
    __tablename__ = 'users'

    cognito_sub   = db.Column(db.String(255), primary_key=True)
    name          = db.Column(db.String(255), nullable=False)
    email         = db.Column(db.String(255), nullable=False, unique=True)
    phone_number  = db.Column(db.String(20))
    created_at    = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
