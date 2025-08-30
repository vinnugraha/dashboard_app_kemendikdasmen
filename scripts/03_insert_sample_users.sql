-- Insert sample users for testing
-- Note: In production, passwords should be properly hashed

-- Super Admin
INSERT INTO users (username, email, password_hash, role_id, sestama_id, unit_id) VALUES 
('superadmin', 'superadmin@kemdikbud.go.id', '$2b$10$example_hash_superadmin', 1, NULL, NULL);

-- Admin users
INSERT INTO users (username, email, password_hash, role_id, sestama_id, unit_id) VALUES 
('admin1', 'admin1@kemdikbud.go.id', '$2b$10$example_hash_admin1', 2, NULL, NULL),
('admin2', 'admin2@kemdikbud.go.id', '$2b$10$example_hash_admin2', 2, NULL, NULL),
('admin3', 'admin3@kemdikbud.go.id', '$2b$10$example_hash_admin3', 2, NULL, NULL),
('admin4', 'admin4@kemdikbud.go.id', '$2b$10$example_hash_admin4', 2, NULL, NULL);

-- Sestama users
INSERT INTO users (username, email, password_hash, role_id, sestama_id, unit_id) VALUES 
('sestama_setjen', 'sestama1@kemdikbud.go.id', '$2b$10$example_hash_sestama1', 3, 1, NULL),
('sestama_gtk', 'sestama2@kemdikbud.go.id', '$2b$10$example_hash_sestama2', 3, 2, NULL),
('sestama_paud', 'sestama3@kemdikbud.go.id', '$2b$10$example_hash_sestama3', 3, 3, NULL),
('sestama_vokasi', 'sestama4@kemdikbud.go.id', '$2b$10$example_hash_sestama4', 3, 4, NULL),
('sestama_itjen', 'sestama5@kemdikbud.go.id', '$2b$10$example_hash_sestama5', 3, 5, NULL),
('sestama_bskap', 'sestama6@kemdikbud.go.id', '$2b$10$example_hash_sestama6', 3, 6, NULL),
('sestama_bpb', 'sestama7@kemdikbud.go.id', '$2b$10$example_hash_sestama7', 3, 7, NULL);

-- Unit kerja users (sample)
INSERT INTO users (username, email, password_hash, role_id, sestama_id, unit_id) VALUES 
('pusdatin', 'pusdatin@kemdikbud.go.id', '$2b$10$example_hash_unit1', 4, 1, 1),
('puslatsdm', 'puslatsdm@kemdikbud.go.id', '$2b$10$example_hash_unit2', 4, 1, 2),
('puspresan', 'puspresan@kemdikbud.go.id', '$2b$10$example_hash_unit3', 4, 1, 3),
('puspeka', 'puspeka@kemdikbud.go.id', '$2b$10$example_hash_unit4', 4, 1, 4),
('puslapdik', 'puslapdik@kemdikbud.go.id', '$2b$10$example_hash_unit5', 4, 1, 5);
