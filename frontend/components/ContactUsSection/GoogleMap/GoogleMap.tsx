const GoogleMap = () => {
    return (
        <div className="w-full mt-10 h-64 rounded-lg overflow-hidden shadow">
            <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.7283283609763!2d-79.63931622334981!3d43.59137475642672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b472672dfe4f1%3A0x7d98de56f9492e4b!2s90%20Burnhamthorpe%20Rd%20W%2C%20Mississauga%2C%20ON%20L5B%203C3!5e0!3m2!1sen!2sca!4v1745874064254!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
};

export default GoogleMap;
