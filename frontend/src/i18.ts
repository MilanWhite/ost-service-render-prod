// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        load: "languageOnly",
        supportedLngs: ["en", "ru", "uk"],
        fallbackLng: "en",

        detection: {
            order: [
                "querystring",
                "cookie",
                "localStorage",
                "navigator",
                "htmlTag",
                "path",
                "subdomain",
            ],
            caches: ["localStorage"],
        },
        returnObjects: true,

        resources: {
            en: {
                translation: {
                    // Language-picker options
                    language_option_english: "English",
                    language_option_ukrainian: "Ukrainian",
                    language_option_russian: "Russian",

                    // HOME PAGE
                    HomePage: {
                        //  Navbar / top links
                        get_free_quote: "Get a Free Quote",
                        login: "Log in",

                        //  Main menu
                        nav_home: "Home",
                        nav_contact_us: "Contact Us",
                        nav_about_us: "About Us",

                        //  Hero (“above the fold”)
                        landing_cta_title:
                            "Your Dream Car, Delivered Worldwide",
                        landing_cta_subtitle:
                            "Access licensed dealer auctions from anywhere in the world. We handle the paperwork, shipping, and customs – start to finish.",
                        landing_cta_button: "Get a Free Quote",

                        //  How-it-works section
                        how_it_works_heading: "How It Works",
                        how_it_works_subheading: "Step by step.",
                        step_title: "Step ",
                        step1_description: "Find your car",
                        step2_description: "Place your bid",
                        step3_description: "We ship it",
                        step4_description: "You drive it",

                        //  Why-choose-us section
                        why_choose_us_heading: "Why Choose Us",
                        trusted_shipping_title: "Trusted Shipping",
                        trusted_shipping_text:
                            "At OST Services, your vehicle’s safe and secure delivery is our highest priority. With care and various quality control measures, we ensure each step of the transportation process meets our high standards, giving you complete peace of mind.",
                        global_reach_title: "Global Reach",
                        global_reach_text:
                            "Our extensive global network allows OST Services to effortlessly connect you with major shipping ports and transportation routes across the world. Whether your vehicle needs to travel across cities or continents, we offer many solutions tailored to your shipping needs.",
                        auction_experience_title: "Auction Experience",
                        auction_experience_text:
                            "Leveraging extensive experience in the vehicle auction industry, OST Services expertly manages auction processes from start to finish. We handle bidding, paperwork, and logistics efficiently, ensuring your experience is always hassle-free.",

                        our_auction_partners: "Our Auction Partners",

                        //  Feature cards
                        auto_auctions_title: "Auto Auctions",
                        auto_auctions_text:
                            "OST Services manages vehicle auctions, handling everything from bidding and paperwork to final logistics. Our efficient processes ensure a smooth and stress-free auction experience for every client.",

                        shipping_title: "Shipping",
                        shipping_text:
                            "We specialize in secure, efficient vehicle transportation solutions tailored to your individual needs. OST Services guarantees timely delivery and care, whether your shipment is local or international.",

                        //  Footer
                        footer_copyright:
                            "© 2019-2023 OST SERVICE A&A LTD. All rights reserved.",
                    },

                    // CONTACT PAGE
                    ContactPage: {
                        //  Headline & blurb
                        contact_heading: "Contact Us",
                        contact_description:
                            "Get in touch with OST Services to discuss your vehicle shipping and auction needs. Complete our simple contact form, and we'll promptly respond to start assisting you today.",

                        //  Address
                        address_label: "Address",
                        address_value1: "1400-90 Burnhamthorpe Rd. W.,",
                        address_value2: "Mississauga, ON, L5B 3C3, Canada",

                        //  Telephone
                        telephone_label: "Telephone",
                        telephone_value: "+1 (647) 857-3105",

                        //  Email
                        email_label: "Email",
                        email_value: "bestiklena1@gmail.com",

                        // contact form fields
                        form_first_name: "First name",
                        form_last_name: "Last name",
                        form_email: "Email",
                        form_phone: "Phone number",
                        form_message: "Message",
                        form_language_label: "Language",
                        form_button_send: "Send Message",

                        // Zod form validation errors
                        error_first_name_required: "First name is required",
                        error_last_name_required: "Last name is required",
                        error_invalid_email: "Invalid email address",
                        error_invalid_phone:
                            "Invalid phone number (must be digits, optionally starting with +, 7–15 digits total)",
                        error_message_required: "Message is required",
                        error_invalid_language:
                            "Please select a valid language",

                        //  Submission flash messages
                        message_submitted: "Message successfully submitted",
                        message_failed: "Failed to send message",
                    },

                    // ABOUT PAGE
                    AboutPage: {
                        about_heading: "About Us",
                        about_text:
                            "OST Services specializes in various vehicle auction and transportation solutions, dedicated to providing efficient auto services worldwide. Our driven team prioritizes efficiency and quality, ensuring every client is satisfied.",

                        mission_heading: "Our mission",
                        mission_text:
                            "Our mission is to deliver exceptional vehicle auction management and dependable shipping solutions with integrity and precision. Committed to excellence, we strive to simplify the process for our clients, building lasting relationships through transparency, efficiency, and outstanding service.",

                        innovation_text:
                            "We continually innovate our processes and leverage our global network to offer optimal solutions tailored to our clients' needs. Through dedication and professionalism, OST Services aims to become your trusted partner for all vehicle transportation and auction services.",
                    },

                    // Authorization (login, change password, etc.)
                    Auth: {
                        // Labels & buttons
                        sign_in_heading: "Sign in to your account",
                        email_address: "Email address",
                        password_label: "Password",
                        forgot_password: "Forgot password?",
                        sign_in_button: "Sign in",

                        back_to_home: "Back to home",
                        back_to_sign_in: "Back to sign in",

                        // Reset-password flow
                        reset_password_heading: "Reset Password",
                        send_code_button: "Send Code",

                        verification_code_label: "Verification Code",
                        enter_6_digit_code: "Enter 6-digit code",

                        new_password_label: "New Password",
                        password_min_chars: "At least 8 characters",
                        password_lowercase: "1 lowercase letter",
                        password_uppercase: "1 uppercase letter",
                        password_number: "1 number",
                        password_special_char: "1 special character",

                        verify_password_label: "Verify Password",
                        passwords_match: "Passwords match",
                        change_password_button: "Change Password",

                        // Zod schema messages
                        error_invalid_email: "Invalid email address",
                        error_password_min_chars:
                            "Password must be at least 8 characters",
                        error_password_number:
                            "Password must contain at least one number",
                        error_password_uppercase:
                            "Password must contain at least one uppercase letter",
                        error_password_lowercase:
                            "Password must contain at least one lowercase letter",
                        error_password_special_char:
                            "Password must contain at least one special character",
                        error_confirm_password_required:
                            "Please confirm your password",
                        error_passwords_match: "Passwords must match",

                        // Auth exceptions
                        error_invalid_or_no_password:
                            "Invalid or no password provided. Please double-check your password.",
                        error_password_set_failed:
                            "Couldn't set your password right now. Please try again in a moment.",
                        error_invalid_email_or_password:
                            "Invalid email or password. Please double-check your input.",
                        error_login_failed:
                            "Couldn't log you in right now. Please try again in a moment.",
                        error_verification_code_length:
                            "Verification code must be exactly 6 digits",
                        error_verification_code_numbers:
                            "Verification code must contain only numbers",
                        error_code_mismatch:
                            "Invalid verification code provided. Please double-check your code.",
                        error_limit_exceeded:
                            "Attempt limit exceeded, please try again another time.",
                        error_reset_password_failed:
                            "Couldn't reset your password right now. Please try again in a moment.",
                        error_send_code_failed:
                            "There has been an issue with sending the verification code, please try again later.",
                    },

                    // AUTHENTICATED VIEW (dashboard, admin, etc.)
                    AuthenticatedView: {
                        //  Top-level nav
                        dashboard: "Dashboard",
                        client_manager: "Client Manager",
                        my_vehicles: "My Vehicles",

                        // Overview & stats
                        overview: "Overview",
                        stats: "Stats",
                        total_cars: "Total Cars",
                        total_users: "Total Users",
                        vehicles_delivered: "Vehicles Delivered",
                        vehicles_not_delivered: "Vehicles Not Delivered",
                        activity_feed: "Activity Feed",
                        recent_users: "Recent Users",
                        recently_created: "Recently Created",
                        not_delivered_yet: "Not Delivered Yet",

                        // Tables / lists
                        not_delivered: "Not Delivered",
                        view: "View",
                        auction: "Auction",
                        in_transit: "In transit",
                        out_for_delivery: "Out for delivery",
                        delivered: "Delivered",

                        client_list: "Client List",
                        clients_signed_up_description:
                            "A list of all the clients signed up to OST Services.",
                        client: "Client",
                        phone_number: "Phone Number",

                        // Invite user dialog
                        cancel: "Cancel",
                        invite_user: "Invite User",
                        inviting_loading: "Inviting...",
                        invite_user_description:
                            "A temporary password will be sent to the email you provide, and the user can set up their account.",
                        company_name_name: "Company Name / Name",
                        email: "Email",
                        vehicles: "Vehicles",

                        // Created labels
                        vehicle_created: "Vehicle Created",
                        user_created: "User Created",

                        // Search & filters
                        search: "Search",
                        show_results_for: "Showing results for ",
                        filtered_by: "filtered by",
                        filter_by: "Filter By",

                        // Vehicle form
                        add_vehicle: "Add Vehicle",
                        add_vehicle_description:
                            "This vehicle will be added to this user's account.",
                        upload_images: "Upload Images",
                        edit_images: "Edit Images",
                        upload_videos: "Upload Videos",

                        thumbnail: "Thumbnail",

                        // General info
                        general_info: "General Info",
                        vehicle_name: "Vehicle Name",
                        lot_number: "Lot Number",
                        auction_name: "Auction Name",
                        location: "Location",
                        shipping_status: "Shipping Status",
                        price_delivery: "Price Delivery",
                        price_shipping: "Price Shipping",

                        // Dispatch info
                        dispatch_info: "Dispatch Info",
                        delivery_address: "Delivery Address",
                        port_of_origin: "Port of Origin",
                        port_of_destination: "Port of Destination",
                        container_number: "Container Number",
                        receiver_id: "Receiver Id",

                        vin: "VIN",
                        powertrain: "Powertrain",
                        model: "Model",
                        color: "Color",

                        // Documents
                        documents: "Documents",
                        bill_of_sale: "Bill of Sale",
                        title_document: "Title Document",
                        bill_of_lading: "Bill of Lading",
                        swb_release_document: "Sea Waybill Release Document",
                        view_bill_of_sale: "View Bill of Sale",
                        view_title_document: "View Title Document",
                        view_bill_of_lading: "View Bill of Lading",
                        view_swb_release_document: "View Sea Waybill Release Document",

                        // Delete vehicle dialog
                        delete_vehicle: "Delete Vehicle",
                        delete_vehicle_description:
                            "Are you sure you want to delete this vehicle? This vehicle will be permanently removed from our servers forever. This action cannot be undone.",

                        // Delete user dialog
                        delete_user: "Delete User",
                        delete_user_description:
                            "Are you sure you want to delete this user? This user account will be permanently removed from our servers forever. This action cannot be undone.",

                        // Edit buttons
                        edit: "Edit",
                        vehicle_info: "Vehicle Info",
                        saving: "Saving…",
                        save: "Save",

                        previous: "Previous",
                        next: "Next",
                        delete: "Delete",

                        price: "Price",
                        logistics_shipping_details:
                            "Logistics / Shipping Details",

                        your_total_vehicles: "Your Total Vehicles",
                        your_vehicles: "Your Vehicles",

                        location_auction_lot_number:
                            "Location / Auction / Lot #",
                        cont_po_pd_deliv_add_rec_id:
                            "Cont. # / PO / PD / Deliv. Add. / Rec. ID",

                        sign_out: "Sign out",

                        // Success
                        Success: {
                            user_invite_sent_successfully:
                                "User invite sent successfully",
                            vehicle_added_successfully:
                                "Vehicle added successfully",
                        },

                        // Error messages
                        Errors: {
                            username_required: "Username is required",
                            invalid_email_address: "Invalid email address",

                            vehicle_name_required: "Vehicle name is required",
                            lot_number_required: "Lot number is required",
                            auction_name_required: "Auction name is required",
                            location_required: "Location is required",
                            shipping_status_required:
                                "Shipping status is required",
                            delivery_price_required:
                                "Delivery price is required",
                            delivery_price_invalid:
                                "Delivery price must be a valid number",
                            shipping_price_required:
                                "Shipping price is required",
                            shipping_price_invalid:
                                "Shipping price must be a valid number",
                            delivery_address_required:
                                "Delivery address is required",
                            port_of_origin_required:
                                "Port of origin is required",
                            port_of_destination_required:
                                "Port of destination is required",
                            container_number_required:
                                "Container number is required",
                            receiver_id_required: "Receiver ID is required",

                            image_required: "At least one image upload is required",

                            failed_to_fetch_users:
                                "Failed to fetch users. Please try again later.",
                            failed_to_send_message:
                                "Failed to send message. Please try again later.",
                            failed_to_create_user:
                                "Failed to create user. Please try again later.",
                            failed_to_create_vehicle:
                                "Failed to create vehicle. Please try again later.",
                            failed_to_delete_vehicle:
                                "Failed to delete vehicle. Please try again.",
                            failed_to_edit_vehicle:
                                "Failed to edit vehicle. Please try again later.",
                            failed_to_load_vehicle:
                                "Failed to load vehicle. Please try again later.",
                            failed_to_fetch_user:
                                "Failed to fetch user. Please try again later.",
                            failed_to_load_vehicles:
                                "Failed to load vehicles. Please try again later.",
                            failed_to_load_dashboard:
                                "Failed to load dashboard. Please try again later.",
                            failed_to_delete_user:
                                "Failed to delete user. Please try again later.",

                            no_images_available: "No images available",

                            exceeded_length: "The input exceeds the maximum allowed length.",
                        },
                    },
                },
            },

            ru: {
                translation: {
                    // Language-picker options
                    language_option_english: "Английский",
                    language_option_ukrainian: "Украинский",
                    language_option_russian: "Русский",

                    // HOME PAGE
                    HomePage: {
                        //  Navbar / top links
                        get_free_quote: "Получить бесплатную консультацию",
                        login: "Войти",

                        //  Main menu
                        nav_home: "Главная",
                        nav_contact_us: "Связаться с нами",
                        nav_about_us: "О нас",

                        //  Hero (“above the fold”)
                        landing_cta_title:
                            "Автомобиль мечты - с доставкой по всему миру",
                        landing_cta_subtitle:
                            "Получите доступ к аукционам официальных дилеров из любой точки мира. Мы берём на себя все документы, доставку и таможенное оформление - от начала до конца.",
                        landing_cta_button: "Получить бесплатную консультацию",

                        //  How-it-works section
                        how_it_works_heading: "Как это работает",
                        how_it_works_subheading: "Шаг за шагом.",
                        step_title: "Шаг ",
                        step1_description: "Найдите свой автомобиль",
                        step2_description: "Сделайте ставку",
                        step3_description: "Мы доставим его",
                        step4_description: "Вы садитесь за руль",

                        //  Why-choose-us section
                        why_choose_us_heading: "Почему выбирают нас",
                        trusted_shipping_title: "Надёжная доставка",
                        trusted_shipping_text:
                            "В OST Services безопасная доставка вашего автомобиля - наш главный приоритет. Благодаря тщательному контролю качества на каждом этапе мы обеспечиваем соответствие высоким стандартам и полное спокойствие клиента.",
                        global_reach_title: "Глобальный охват",
                        global_reach_text:
                            "Развитая международная сеть позволяет OST Services легко организовывать доставку через основные морские порты и транспортные маршруты мира. Независимо от того, нужно ли перевезти авто по городу или на другой континент - мы подберем подходящее решение.",
                        auction_experience_title: "Опыт участия в аукционах",
                        auction_experience_text:
                            "Имея большой опыт в автомобильных аукционах, OST Services полностью сопровождает клиента на всех этапах - от участия в торгах до оформления документов и логистики. Всё просто и без лишних хлопот.",

                        our_auction_partners: "Наши партнёры по аукционам",
                        
                        //  Feature cards
                        auto_auctions_title: "Автоаукционы",
                        auto_auctions_text:
                            "OST Services организует участие в автоаукционах: от подачи ставок и оформления документов до логистики. Мы обеспечиваем комфортный и надёжный процесс покупки.",
                        shipping_title: "Доставка",
                        shipping_text:
                            "Мы специализируемся на безопасной и эффективной доставке автомобилей с учётом ваших индивидуальных потребностей. OST Services гарантирует своевременную и аккуратную доставку - как внутри страны, так и за рубеж.",

                        //  Footer
                        footer_copyright:
                            "© 2019-2023 OST SERVICE A&A LTD. Все права защищены.",
                    },

                    // CONTACT PAGE
                    ContactPage: {
                        //  Headline & blurb
                        contact_heading: "Связаться с нами",
                        contact_description:
                            "Свяжитесь с OST Services, чтобы обсудить доставку и участие в аукционах. Заполните простую форму, и мы оперативно свяжемся с вами.",

                        //  Address
                        address_label: "Адрес",
                        address_value1: "1400-90 Burnhamthorpe Rd. W.,",
                        address_value2: "Миссисога, Онтарио, L5B 3C3, Канада",

                        //  Telephone
                        telephone_label: "Телефон",
                        telephone_value: "+1 (647) 857-3105",

                        //  Email
                        email_label: "Электронная почта",
                        email_value: "bestiklena1@gmail.com",

                        // contact form fields
                        form_first_name: "Имя",
                        form_last_name: "Фамилия",
                        form_email: "Электронная почта",
                        form_phone: "Номер телефона",
                        form_message: "Сообщение",
                        form_language_label: "Язык",
                        form_button_send: "Отправить сообщение",

                        // Zod form validation errors
                        error_first_name_required:
                            "Имя обязательно для заполнения",
                        error_last_name_required:
                            "Фамилия обязательна для заполнения",
                        error_invalid_email: "Неверный адрес электронной почты",
                        error_invalid_phone:
                            "Некорректный номер телефона (должен содержать только цифры, возможно с +, от 7 до 15 цифр)",
                        error_message_required:
                            "Сообщение обязательно для заполнения",
                        error_invalid_language:
                            "Пожалуйста, выберите корректный язык",

                        //  Submission flash messages
                        message_submitted: "Сообщение успешно отправлено",
                        message_failed: "Не удалось отправить сообщение",
                    },

                    // ABOUT PAGE
                    AboutPage: {
                        about_heading: "О нас",
                        about_text:
                            "OST Services предоставляет услуги по организации автоаукционов и международной транспортировке автомобилей. Наша цель - обеспечить быстрый, качественный и надёжный сервис по всему миру.",
                        mission_heading: "Наша миссия",
                        mission_text:
                            "Наша миссия - обеспечить безупречную организацию аукционов и надёжную доставку автомобилей с точностью, ответственностью и профессионализмом. Мы стремимся упростить процесс для клиентов и выстроить с ними долгосрочные отношения, основанные на доверии.",
                        innovation_text:
                            "Мы постоянно совершенствуем процессы и используем международные связи, чтобы предложить клиентам лучшие решения. OST Services стремится стать вашим надёжным партнёром в сфере автоаукционов и логистики.",
                    },

                    // Authorization (login, change password, etc.)
                    Auth: {
                        // Labels & buttons
                        sign_in_heading: "Войдите в свой аккаунт",
                        email_address: "Электронная почта",
                        password_label: "Пароль",
                        forgot_password: "Забыли пароль?",
                        sign_in_button: "Войти",

                        back_to_home: "Вернуться на главную",
                        back_to_sign_in: "Вернуться ко входу",

                        // Reset-password flow
                        reset_password_heading: "Сброс пароля",
                        send_code_button: "Отправить код",

                        verification_code_label: "Код подтверждения",
                        enter_6_digit_code: "Введите 6-значный код",

                        new_password_label: "Новый пароль",
                        password_min_chars: "Не менее 8 символов",
                        password_lowercase: "1 строчная буква",
                        password_uppercase: "1 заглавная буква",
                        password_number: "1 цифра",
                        password_special_char: "1 специальный символ",

                        verify_password_label: "Подтвердите пароль",
                        passwords_match: "Пароли совпадают",
                        change_password_button: "Изменить пароль",

                        // Zod schema messages
                        error_invalid_email: "Неверный адрес электронной почты",
                        error_password_min_chars:
                            "Пароль должен содержать минимум 8 символов",
                        error_password_number:
                            "Пароль должен содержать хотя бы одну цифру",
                        error_password_uppercase:
                            "Пароль должен содержать хотя бы одну заглавную букву",
                        error_password_lowercase:
                            "Пароль должен содержать хотя бы одну строчную букву",
                        error_password_special_char:
                            "Пароль должен содержать хотя бы один специальный символ",
                        error_confirm_password_required:
                            "Пожалуйста, подтвердите пароль",
                        error_passwords_match: "Пароли должны совпадать",

                        // Auth exceptions
                        error_invalid_or_no_password:
                            "Неверный или отсутствующий пароль. Пожалуйста, проверьте правильность ввода.",
                        error_password_set_failed:
                            "Не удалось установить пароль. Пожалуйста, попробуйте позже.",
                        error_invalid_email_or_password:
                            "Неверная почта или пароль. Проверьте данные и повторите попытку.",
                        error_login_failed:
                            "Не удалось войти. Пожалуйста, попробуйте позже.",
                        error_verification_code_length:
                            "Код подтверждения должен содержать ровно 6 цифр",
                        error_verification_code_numbers:
                            "Код подтверждения должен содержать только цифры",
                        error_code_mismatch:
                            "Неверный код подтверждения. Проверьте правильность ввода.",
                        error_limit_exceeded:
                            "Превышен лимит попыток. Попробуйте позже.",
                        error_reset_password_failed:
                            "Не удалось сбросить пароль. Пожалуйста, попробуйте позже.",
                        error_send_code_failed:
                            "Не удалось отправить код подтверждения. Попробуйте позже.",
                    },

                    AuthenticatedView: {
                        //  Top-level nav
                        dashboard: "Панель управления",
                        client_manager: "Клиенты",
                        my_vehicles: "Мои автомобили",

                        // Overview & stats
                        overview: "Обзор",
                        stats: "Статистика",
                        total_cars: "Всего автомобилей",
                        total_users: "Всего пользователей",
                        vehicles_delivered: "Доставлено автомобилей",
                        vehicles_not_delivered: "Недоставлено автомобилей",
                        activity_feed: "Лента активности",
                        recent_users: "Новые пользователи",
                        recently_created: "Недавно создано",
                        not_delivered_yet: "Ещё не доставлено",

                        // Tables / lists
                        not_delivered: "Не доставлено",
                        view: "Просмотр",
                        auction: "Аукцион",
                        in_transit: "В пути",
                        out_for_delivery: "Передано на доставку",
                        delivered: "Доставлено",

                        client_list: "Список клиентов",
                        clients_signed_up_description:
                            "Список всех клиентов, зарегистрированных в OST Services.",
                        client: "Клиент",
                        phone_number: "Номер телефона",

                        // Invite user dialog
                        cancel: "Отмена",
                        invite_user: "Пригласить пользователя",
                        inviting_loading: "Приглашение...",
                        invite_user_description:
                            "Временный пароль будет отправлен на указанный email. Пользователь сможет настроить свой аккаунт.",
                        company_name_name: "Название компании / Имя",
                        email: "Электронная почта",
                        vehicles: "Автомобили",

                        // Created labels
                        vehicle_created: "Автомобиль добавлен",
                        user_created: "Пользователь создан",

                        // Search & filters
                        search: "Поиск",
                        show_results_for: "Показаны результаты по ",
                        filtered_by: "отфильтровано по",
                        filter_by: "Фильтровать по",

                        // Vehicle form
                        add_vehicle: "Добавить автомобиль",
                        add_vehicle_description:
                            "Этот автомобиль будет добавлен в аккаунт выбранного пользователя.",
                        upload_images: "Загрузить изображения",
                        edit_images: "Редактировать изображения",
                        upload_videos: "Загрузить видео",

                        thumbnail: "Миниатюра",

                        // General info
                        general_info: "Общая информация",
                        vehicle_name: "Название автомобиля",
                        lot_number: "Номер лота",
                        auction_name: "Название аукциона",
                        location: "Местоположение",
                        shipping_status: "Статус доставки",
                        price_delivery: "Стоимость доставки",
                        price_shipping: "Стоимость перевозки",

                        // Dispatch info
                        dispatch_info: "Информация об отправке",
                        delivery_address: "Адрес доставки",
                        port_of_origin: "Порт отправления",
                        port_of_destination: "Порт назначения",
                        container_number: "Номер контейнера",
                        receiver_id: "ID получателя",

                        vin: "VIN",
                        powertrain: "Трансмиссия и силовая установка",
                        model: "Модель",
                        color: "Цвет",

                        // Documents
                        documents: "Документы",
                        bill_of_sale: "Договор купли-продажи",
                        title_document: "Свидетельство о праве собственности",
                        bill_of_lading: "Транспортная накладная",
                        swb_release_document: "Документ выдачи морской накладной",
                        view_bill_of_sale: "Просмотреть договор купли-продажи",
                        view_title_document: "Просмотреть свидетельство",
                        view_bill_of_lading: "Просмотреть транспортную накладную",
                        view_swb_release_document: "Просмотреть документ выдачи морской накладной",

                        // Delete vehicle dialog
                        delete_vehicle: "Удалить автомобиль",
                        delete_vehicle_description:
                            "Вы уверены, что хотите удалить этот автомобиль? Он будет безвозвратно удалён с наших серверов. Это действие нельзя отменить.",

                        // Delete user dialog
                        delete_user: "Удалить пользователя",
                        delete_user_description:
                            "Вы уверены, что хотите удалить этого пользователя? Аккаунт будет безвозвратно удалён с наших серверов. Это действие нельзя отменить.",

                        // Edit buttons
                        edit: "Редактировать",
                        vehicle_info: "Информация об автомобиле",
                        saving: "Сохранение…",
                        save: "Сохранить",

                        previous: "Назад",
                        next: "Далее",
                        delete: "Удалить",

                        price: "Цена",
                        logistics_shipping_details:
                            "Логистика / детали доставки",

                        your_total_vehicles: "Ваши автомобили - всего",
                        your_vehicles: "Ваши автомобили",

                        location_auction_lot_number:
                            "Местоположение / Аукцион / Лот №",
                        cont_po_pd_deliv_add_rec_id:
                            "Конт. № / Порт отпр. / Порт назнач. / Адрес / ID получ.",

                        sign_out: "Выйти",

                        // Success
                        Success: {
                            user_invite_sent_successfully:
                                "Приглашение отправлено успешно",
                            vehicle_added_successfully:
                                "Автомобиль успешно добавлен",
                        },

                        // Error messages
                        Errors: {
                            username_required: "Имя пользователя обязательно",
                            invalid_email_address:
                                "Неверный адрес электронной почты",

                            vehicle_name_required:
                                "Название автомобиля обязательно",
                            lot_number_required: "Номер лота обязателен",
                            auction_name_required:
                                "Название аукциона обязательно",
                            location_required: "Местоположение обязательно",
                            shipping_status_required:
                                "Необходимо указать статус доставки",
                            delivery_price_required:
                                "Необходимо указать стоимость доставки",
                            delivery_price_invalid:
                                "Стоимость доставки должна быть числом",
                            shipping_price_required:
                                "Необходимо указать стоимость перевозки",
                            shipping_price_invalid:
                                "Стоимость перевозки должна быть числом",
                            delivery_address_required:
                                "Адрес доставки обязателен",
                            port_of_origin_required:
                                "Порт отправления обязателен",
                            port_of_destination_required:
                                "Порт назначения обязателен",
                            container_number_required:
                                "Номер контейнера обязателен",
                            receiver_id_required: "ID получателя обязателен",

                            image_required: "Необходимо загрузить как минимум одно изображение",

                            failed_to_fetch_users:
                                "Не удалось получить список пользователей. Попробуйте позже.",
                            failed_to_send_message:
                                "Не удалось отправить сообщение. Попробуйте позже.",
                            failed_to_create_user:
                                "Не удалось создать пользователя. Попробуйте позже.",
                            failed_to_create_vehicle:
                                "Не удалось добавить автомобиль. Попробуйте позже.",
                            failed_to_delete_vehicle:
                                "Не удалось удалить автомобиль. Попробуйте снова.",
                            failed_to_edit_vehicle:
                                "Не удалось отредактировать автомобиль. Попробуйте позже.",
                            failed_to_load_vehicle:
                                "Не удалось загрузить информацию об автомобиле. Попробуйте позже.",
                            failed_to_fetch_user:
                                "Не удалось получить пользователя. Попробуйте позже.",
                            failed_to_load_vehicles:
                                "Не удалось загрузить автомобили. Попробуйте позже.",
                            failed_to_load_dashboard:
                                "Не удалось загрузить панель. Попробуйте позже.",
                            failed_to_delete_user:
                                "Не удалось удалить пользователя. Пожалуйста, попробуйте позже.",

                            no_images_available: "Изображения недоступны",

                            exceeded_length: "Длина введённых данных превышает допустимый предел.",
                        },
                    },
                },
            },

            uk: {
                translation: {
                    // Language-picker options
                    language_option_english: "Англійська",
                    language_option_ukrainian: "Українська",
                    language_option_russian: "Російська",

                    // HOME PAGE
                    HomePage: {
                        //  Navbar / top links
                        get_free_quote: "Отримати безкоштовну консультацію",
                        login: "Увійти",

                        //  Main menu
                        nav_home: "Головна",
                        nav_contact_us: "Зв'язатися з нами",
                        nav_about_us: "Про нас",

                        //  Hero (“above the fold”)
                        landing_cta_title:
                            "Авто мрії з доставкою по всьому світу",
                        landing_cta_subtitle:
                            "Отримайте доступ до аукціонів офіційних дилерів з будь-якої точки світу. Ми беремо на себе документи, доставку та митне оформлення - від початку до кінця.",
                        landing_cta_button: "Отримати безкоштовну консультацію",

                        //  How-it-works section
                        how_it_works_heading: "Як це працює",
                        how_it_works_subheading: "Крок за кроком.",
                        step_title: "Крок ",
                        step1_description: "Знайдіть авто",
                        step2_description: "Зробіть ставку",
                        step3_description: "Ми доставимо його",
                        step4_description: "Ви керуєте ним",

                        //  Why-choose-us section
                        why_choose_us_heading: "Чому обирають нас",
                        trusted_shipping_title: "Надійна доставка",
                        trusted_shipping_text:
                            "У OST Services ми на перше місце ставимо безпечну доставку вашого авто. Завдяки контролю якості на кожному етапі ми забезпечуємо відповідність нашим стандартам і ваш спокій.",
                        global_reach_title: "Глобальне покриття",
                        global_reach_text:
                            "Наша широка міжнародна мережа дозволяє OST Services з'єднувати вас із ключовими портами та маршрутами у всьому світі. Незалежно від того, чи потрібно перевезти авто містом або континентом - ми маємо рішення.",
                        auction_experience_title: "Досвід в аукціонах",
                        auction_experience_text:
                            "Завдяки багаторічному досвіду OST Services професійно супроводжує вас в процесі участі в аукціонах - від ставки до логістики. Без зайвого клопоту.",
                        
                        our_auction_partners: "Наші партнери з аукціонів",
                        
                        //  Feature cards
                        auto_auctions_title: "Автоаукціони",
                        auto_auctions_text:
                            "OST Services керує процесом автоаукціонів: від ставок і документів до логістики. Ми забезпечуємо легкий і безпечний досвід для кожного клієнта.",

                        shipping_title: "Доставка",
                        shipping_text:
                            "Ми спеціалізуємось на безпечному та ефективному транспортуванні авто, адаптованому під ваші потреби. OST Services гарантує своєчасну доставку з дбайливим ставленням - в Україні та за кордоном.",

                        //  Footer
                        footer_copyright:
                            "© 2019–2023 OST SERVICE A&A LTD. Усі права захищено.",
                    },

                    // CONTACT PAGE
                    ContactPage: {
                        //  Headline & blurb
                        contact_heading: "Зв'язатися з нами",
                        contact_description:
                            "Зв’яжіться з OST Services, щоб обговорити доставку авто або участь в аукціонах. Заповніть просту форму - і ми оперативно відповімо.",

                        //  Address
                        address_label: "Адреса",
                        address_value1: "1400-90 Burnhamthorpe Rd. W.,",
                        address_value2: "Міссісаґа, Онтаріо, L5B 3C3, Канада",

                        //  Telephone
                        telephone_label: "Телефон",
                        telephone_value: "+1 (647) 857-3105",

                        //  Email
                        email_label: "Електронна пошта",
                        email_value: "bestiklena1@gmail.com",

                        // contact form fields
                        form_first_name: "Ім'я",
                        form_last_name: "Прізвище",
                        form_email: "Електронна пошта",
                        form_phone: "Номер телефону",
                        form_message: "Повідомлення",
                        form_language_label: "Мова",
                        form_button_send: "Надіслати повідомлення",

                        // Zod form validation errors
                        error_first_name_required: "Ім’я є обов’язковим",
                        error_last_name_required: "Прізвище є обов’язковим",
                        error_invalid_email: "Невірна електронна адреса",
                        error_invalid_phone:
                            "Невірний номер телефону (повинен містити тільки цифри, може починатися з +, 7–15 цифр)",
                        error_message_required: "Повідомлення є обов’язковим",
                        error_invalid_language: "Оберіть дійсну мову",

                        //  Submission flash messages
                        message_submitted: "Повідомлення успішно надіслано",
                        message_failed: "Не вдалося надіслати повідомлення",
                    },

                    // ABOUT PAGE
                    AboutPage: {
                        about_heading: "Про нас",
                        about_text:
                            "OST Services надає послуги з організації автоаукціонів і транспортування авто. Ми забезпечуємо ефективний сервіс по всьому світу. Наша команда дбає про якість і зручність для кожного клієнта.",

                        mission_heading: "Наша місія",
                        mission_text:
                            "Ми прагнемо забезпечити високоякісний менеджмент автоаукціонів та надійні логістичні рішення з точністю й доброчесністю. Ми спрощуємо процес для клієнтів та будуємо довготривалі стосунки на основі прозорості та професіоналізму.",

                        innovation_text:
                            "Ми постійно вдосконалюємо наші процеси та використовуємо глобальні ресурси для створення індивідуальних рішень для кожного клієнта. OST Services прагне стати вашим надійним партнером у галузі автоаукціонів і транспортування.",
                    },

                    // Authorization (login, change password, etc.)
                    Auth: {
                        // Labels & buttons
                        sign_in_heading: "Увійдіть до свого акаунта",
                        email_address: "Електронна пошта",
                        password_label: "Пароль",
                        forgot_password: "Забули пароль?",
                        sign_in_button: "Увійти",

                        back_to_home: "На головну",
                        back_to_sign_in: "Повернутися до входу",

                        // Reset-password flow
                        reset_password_heading: "Скидання пароля",
                        send_code_button: "Надіслати код",

                        verification_code_label: "Код підтвердження",
                        enter_6_digit_code: "Введіть 6-значний код",

                        new_password_label: "Новий пароль",
                        password_min_chars: "Щонайменше 8 символів",
                        password_lowercase: "1 мала літера",
                        password_uppercase: "1 велика літера",
                        password_number: "1 цифра",
                        password_special_char: "1 спеціальний символ",

                        verify_password_label: "Підтвердьте пароль",
                        passwords_match: "Паролі збігаються",
                        change_password_button: "Змінити пароль",

                        // Zod schema messages
                        error_invalid_email: "Невірна електронна адреса",
                        error_password_min_chars:
                            "Пароль має містити щонайменше 8 символів",
                        error_password_number:
                            "Пароль має містити хоча б одну цифру",
                        error_password_uppercase:
                            "Пароль має містити хоча б одну велику літеру",
                        error_password_lowercase:
                            "Пароль має містити хоча б одну малу літеру",
                        error_password_special_char:
                            "Пароль має містити хоча б один спеціальний символ",
                        error_confirm_password_required:
                            "Підтвердження пароля обов'язкове",
                        error_passwords_match: "Паролі повинні збігатися",

                        // Auth exceptions
                        error_invalid_or_no_password:
                            "Вказано невірний або відсутній пароль. Будь ласка, перевірте ще раз.",
                        error_password_set_failed:
                            "Наразі не вдалося встановити пароль. Спробуйте трохи пізніше.",
                        error_invalid_email_or_password:
                            "Неправильна електронна адреса або пароль. Перевірте дані.",
                        error_login_failed:
                            "Не вдалося виконати вхід. Спробуйте пізніше.",
                        error_verification_code_length:
                            "Код підтвердження має містити рівно 6 цифр",
                        error_verification_code_numbers:
                            "Код підтвердження повинен містити лише цифри",
                        error_code_mismatch:
                            "Невірний код підтвердження. Перевірте правильність.",
                        error_limit_exceeded:
                            "Перевищено ліміт спроб, спробуйте знову пізніше.",
                        error_reset_password_failed:
                            "Не вдалося скинути пароль. Спробуйте пізніше.",
                        error_send_code_failed:
                            "Сталася помилка під час надсилання коду. Спробуйте пізніше.",
                    },
                    // AUTHENTICATED VIEW (dashboard, admin, etc.)
                    AuthenticatedView: {
                        //  Top-level nav
                        dashboard: "Панель керування",
                        client_manager: "Клієнти",
                        my_vehicles: "Мої автомобілі",

                        // Overview & stats
                        overview: "Огляд",
                        stats: "Статистика",
                        total_cars: "Всього авто",
                        total_users: "Всього користувачів",
                        vehicles_delivered: "Доставлено авто",
                        vehicles_not_delivered: "Недоставлено авто",
                        activity_feed: "Активність",
                        recent_users: "Нові користувачі",
                        recently_created: "Нещодавно створено",
                        not_delivered_yet: "Ще не доставлено",

                        // Tables / lists
                        not_delivered: "Не доставлено",
                        view: "Переглянути",
                        auction: "Аукціон",
                        in_transit: "У дорозі",
                        out_for_delivery: "В процесі доставки",
                        delivered: "Доставлено",

                        client_list: "Список клієнтів",
                        clients_signed_up_description:
                            "Список усіх клієнтів, зареєстрованих у OST Services.",
                        client: "Клієнт",
                        phone_number: "Номер телефону",

                        // Invite user dialog
                        cancel: "Скасувати",
                        invite_user: "Запросити користувача",
                        inviting_loading: "Надсилаємо запрошення...",
                        invite_user_description:
                            "Тимчасовий пароль буде надіслано на вказану електронну пошту. Користувач зможе налаштувати свій акаунт.",
                        company_name_name: "Назва компанії / Ім’я",
                        email: "Електронна пошта",
                        vehicles: "Автомобілі",

                        // Created labels
                        vehicle_created: "Авто додано",
                        user_created: "Користувача створено",

                        // Search & filters
                        search: "Пошук",
                        show_results_for: "Результати за запитом ",
                        filtered_by: "відфільтровано за",
                        filter_by: "Фільтрувати за",

                        // Vehicle form
                        add_vehicle: "Додати авто",
                        add_vehicle_description:
                            "Це авто буде додано до акаунта користувача.",
                        upload_images: "Завантажити зображення",
                        edit_images: "Редагувати зображення",
                        upload_videos: "Завантажити відео",

                        thumbnail: "Мініатюра",

                        // General info
                        general_info: "Загальна інформація",
                        vehicle_name: "Назва авто",
                        lot_number: "Номер лота",
                        auction_name: "Назва аукціону",
                        location: "Місцезнаходження",
                        shipping_status: "Статус доставки",
                        price_delivery: "Ціна доставки",
                        price_shipping: "Ціна транспортування",

                        // Dispatch info
                        dispatch_info: "Інформація про відправку",
                        delivery_address: "Адреса доставки",
                        port_of_origin: "Порт відправлення",
                        port_of_destination: "Порт призначення",
                        container_number: "Номер контейнера",
                        receiver_id: "ID одержувача",

                        vin: "VIN",
                        powertrain: "Трансмісія та силова установка",
                        model: "Модель",
                        color: "Колір",

                        // Documents
                        documents: "Документи",
                        bill_of_sale: "Рахунок-фактура",
                        title_document: "Свідоцтво про право власності",
                        bill_of_lading: "Транспортна накладна",
                        swb_release_document: "Документ видачі морської накладної",
                        view_bill_of_sale: "Переглянути рахунок-фактуру",
                        view_title_document: "Переглянути свідоцтво",
                        view_bill_of_lading: "Переглянути транспортну накладну",
                        view_swb_release_document: "Просмотреть документ выдачи морской накладной",

                        // Delete vehicle dialog
                        delete_vehicle: "Видалити авто",
                        delete_vehicle_description:
                            "Ви впевнені, що хочете видалити це авто? Його буде остаточно видалено з наших серверів. Цю дію не можна скасувати.",

                        // Delete user dialog
                        delete_user: "Видалити користувача",
                        delete_user_description:
                            "Ви впевнені, що хочете видалити цього користувача? Акаунт буде остаточно видалений з наших серверів. Цю дію не можна скасувати.",

                        // Edit buttons
                        edit: "Редагувати",
                        vehicle_info: "Інформація про авто",
                        saving: "Збереження…",
                        save: "Зберегти",

                        previous: "Назад",
                        next: "Далі",
                        delete: "Видалити",

                        price: "Ціна",
                        logistics_shipping_details:
                            "Логістика / Деталі доставки",

                        your_total_vehicles: "Усього ваших авто",
                        your_vehicles: "Ваші авто",

                        location_auction_lot_number:
                            "Локація / Аукціон / Лот №",
                        cont_po_pd_deliv_add_rec_id:
                            "Конт. № / Порт відпр. / Порт призн. / Адреса / ID одерж.",

                        sign_out: "Вийти",

                        // Success
                        Success: {
                            user_invite_sent_successfully:
                                "Запрошення успішно надіслано",
                            vehicle_added_successfully: "Авто успішно додано",
                        },

                        // Error messages
                        Errors: {
                            username_required:
                                "Ім’я користувача є обов’язковим",
                            invalid_email_address: "Невірна електронна адреса",

                            vehicle_name_required: "Назва авто є обов’язковою",
                            lot_number_required: "Номер лота є обов’язковим",
                            auction_name_required:
                                "Назва аукціону є обов’язковою",
                            location_required:
                                "Місцезнаходження є обов’язковим",
                            shipping_status_required:
                                "Потрібно вказати статус доставки",
                            delivery_price_required:
                                "Ціна доставки є обов’язковою",
                            delivery_price_invalid:
                                "Ціна доставки повинна бути числом",
                            shipping_price_required:
                                "Ціна транспортування є обов’язковою",
                            shipping_price_invalid:
                                "Ціна транспортування повинна бути числом",
                            delivery_address_required:
                                "Адреса доставки є обов’язковою",
                            port_of_origin_required:
                                "Порт відправлення є обов’язковим",
                            port_of_destination_required:
                                "Порт призначення є обов’язковим",
                            container_number_required:
                                "Номер контейнера є обов’язковим",
                            receiver_id_required:
                                "ID одержувача є обов’язковим",

                            image_required: "Потрібно завантажити принаймні одне зображення",

                            failed_to_fetch_users:
                                "Не вдалося завантажити користувачів. Спробуйте пізніше.",
                            failed_to_send_message:
                                "Не вдалося надіслати повідомлення. Спробуйте пізніше.",
                            failed_to_create_user:
                                "Не вдалося створити користувача. Спробуйте пізніше.",
                            failed_to_create_vehicle:
                                "Не вдалося додати авто. Спробуйте пізніше.",
                            failed_to_delete_vehicle:
                                "Не вдалося видалити авто. Спробуйте ще раз.",
                            failed_to_edit_vehicle:
                                "Не вдалося оновити авто. Спробуйте пізніше.",
                            failed_to_load_vehicle:
                                "Не вдалося завантажити авто. Спробуйте пізніше.",
                            failed_to_fetch_user:
                                "Не вдалося отримати дані користувача. Спробуйте пізніше.",
                            failed_to_load_vehicles:
                                "Не вдалося завантажити список авто. Спробуйте пізніше.",
                            failed_to_load_dashboard:
                                "Не вдалося завантажити панель. Спробуйте пізніше.",
                            failed_to_delete_user:
                                "Не вдалося видалити користувача. Спробуйте пізніше.",

                            no_images_available: "Зображення недоступні",

                            exceeded_length: "Довжина введених даних перевищує допустиму межу.",
                        },
                    },
                },
            },
        },

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
