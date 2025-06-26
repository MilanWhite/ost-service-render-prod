from datetime import datetime, timezone

from sqlalchemy import ARRAY, TEXT
from app.extensions import db

class User(db.Model):
    __tablename__ = "users"

    cognito_sub  = db.Column(db.String(255), primary_key=True)

    name         = db.Column(db.String(255), nullable=False)
    email        = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(20))
    created_at   = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    vehicles = db.relationship(
        "Vehicle",
        back_populates="owner",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def to_dict(self):
        return {
            "cognito_sub": self.cognito_sub,
            "name":        self.name,
            "email":       self.email,
            "phone_number": self.phone_number,
            "created_at":   self.created_at.isoformat(),
        }


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_name        = db.Column(db.String(100), nullable=False, default="")
    lot_number          = db.Column(db.String(50),  nullable=False)
    auction_name        = db.Column(db.String(100), nullable=False)
    location            = db.Column(db.String(100), nullable=False)
    shipping_status     = db.Column(db.String(50),  nullable=False)
    price_delivery      = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    price_shipping      = db.Column(db.Numeric(10, 2), nullable=False, default=0)

    vin         = db.Column(db.CHAR(17))
    powertrain  = db.Column(db.String(50))
    model       = db.Column(db.String(100))
    color       = db.Column(db.String(30))

    cognito_sub = db.Column(
        db.String(255),
        db.ForeignKey("users.cognito_sub", ondelete="CASCADE"),
        nullable=False,
    )

    user_email          = db.Column(db.String(100), nullable=False)
    created_at          = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    container_number    = db.Column(db.String(20))
    port_of_origin      = db.Column(db.String(100))
    port_of_destination = db.Column(db.String(100))
    delivery_address    = db.Column(db.Text)
    receiver_id         = db.Column(db.String(255))

    image_order = db.Column(
        ARRAY(TEXT),
        nullable=False,
        default=list,
    )

    owner = db.relationship("User", back_populates="vehicles")

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
            "vin":                  self.vin,
            "powertrain":           self.powertrain,
            "model":                self.model,
            "color":                self.color,
            "cognito_sub":          self.cognito_sub,
            "user_email":           self.user_email,
            "created_at":           self.created_at.isoformat(),
            "container_number":     self.container_number,
            "port_of_origin":       self.port_of_origin,
            "port_of_destination":  self.port_of_destination,
            "delivery_address":     self.delivery_address,
            "receiver_id":          self.receiver_id,
            "image_order":          self.image_order,
        }