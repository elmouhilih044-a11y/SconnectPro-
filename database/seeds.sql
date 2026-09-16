INSERT INTO facilities (name, type, erp_capacity, is_divisible)
VALUES
('Complexe sportif municipal', 'Gymnase', 500, true),
('Piscine municipale', 'Piscine', 300, false),
('Salle de boxe', 'Salle spécialisée', 80, false);

INSERT INTO associations
(name, contact_email, contact_phone, is_conventioned)
VALUES
('Club Sportif Municipal', 'contact@csm.ma', '0600000001', true),
('Association Jeunesse Active', 'contact@jeunesseactive.ma', '0600000002', true),
('Club Boxing Pro', 'contact@boxingpro.ma', '0600000003', false);

INSERT INTO activities
(facility_id, association_id, name, sport_type, base_price,
 max_capacity, day_of_week, start_time, end_time, sub_zone,
 age_category, is_all_public, status)
VALUES
(1, 1, 'Football Jeunes', 'Football', 300.00,
 30, 2, '17:00', '18:30', 'Terrain A',
 'U12', false, 'ACTIVE'),

(1, 2, 'Basketball Adultes', 'Basketball', 350.00,
 25, 3, '18:00', '19:30', 'Terrain B',
 'Senior', true, 'ACTIVE'),

(2, 1, 'Natation Loisirs', 'Natation', 250.00,
 20, 4, '10:00', '11:00', 'Bassin principal',
 'Senior', true, 'ACTIVE'),

(3, 3, 'Boxe Débutants', 'Boxe', 400.00,
 15, 5, '18:00', '19:30', 'Salle principale',
 'Senior', true, 'ACTIVE');

INSERT INTO families
(reference_name, quotient_familial)
VALUES
('Famille El Amrani', 450.00),
('Famille Bennani', 800.00),
('Famille Alaoui', 1200.00);

INSERT INTO members
(family_id, first_name, last_name, birth_date,
 is_resident, passport_code, medical_certificate_date)
VALUES
(1, 'Yassine', 'El Amrani', '2014-05-12',
 true, 'PASS001', '2025-09-01'),

(1, 'Sara', 'El Amrani', '2012-03-20',
 true, 'PASS002', '2025-09-01'),

(2, 'Adam', 'Bennani', '1998-07-15',
 true, 'PASS003', '2025-08-15'),

(3, 'Nadia', 'Alaoui', '1995-11-03',
 false, 'PASS004', '2025-09-10');

INSERT INTO registrations
(member_id, activity_id, final_price, payment_plan,
 installment_1, installment_2, installment_3,
 status, medical_compliance_status)
VALUES
(1, 1, 240.00, '3_INSTALLMENTS',
 80.00, 80.00, 80.00,
 'CONFIRMED', 'COMPLIANT'),

(3, 2, 350.00, 'ONE_PAYMENT',
 350.00, 0.00, 0.00,
 'CONFIRMED', 'COMPLIANT'),

(4, 3, 400.00, '2_INSTALLMENTS',
 200.00, 200.00, 0.00,
 'CONFIRMED', 'COMPLIANT');

INSERT INTO waiting_list
(activity_id, member_id, priority_score, status, deadline_confirmation)
VALUES
(1, 2, 80, 'WAITING', NULL);