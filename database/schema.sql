CREATE TABLE facilities(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    erp_capacity INTEGER NOT NULL,
    is_divisible BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE associations(

id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name VARCHAR(150) NOT NULL,
contact_email VARCHAR(200) UNIQUE NOT NULL,
contact_phone VARCHAR(200) NOT NULL,
is_conventioned BOOLEAN NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activities(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(id),
    association_id INTEGER REFERENCES associations(id),
    name VARCHAR(150) NOT NULL,
    sport_type VARCHAR(150) NOT NULL,
    base_price DECIMAL(10,2),
    max_capacity INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    sub_zone VARCHAR(200) NOT NULL,
    age_category VARCHAR(50) NOT NULL,
    is_all_public BOOLEAN NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE families(
     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     reference_name VARCHAR(150) NOT NULL,
      quotient_familial DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    family_id INTEGER REFERENCES families(id),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    birth_date DATE NOT NULL,
    is_resident BOOLEAN NOT NULL,
    passport_code VARCHAR(200),
    medical_certificate_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    activity_id INTEGER REFERENCES activities(id),
    final_price DECIMAL(10,2),
    payment_plan VARCHAR(150) NOT NULL,
    installment_1 DECIMAL(10,2),
    installment_2 DECIMAL(10,2),
    installment_3 DECIMAL(10,2),
    status VARCHAR(100) NOT NULL,
    medical_compliance_status VARCHAR(150) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(member_id, activity_id)
);

CREATE TABLE waiting_list(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    activity_id INTEGER REFERENCES activities(id),
    priority_score INTEGER NOT NULL,
    status VARCHAR(150) NOT NULL,
    deadline_confirmation TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(member_id, activity_id)

);


