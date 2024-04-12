CREATE TABLE PAIS (			
	id_pais SERIAL PRIMARY KEY NOT NULL,
	nombre_pais VARCHAR(50),
	status_pais BOOLEAN
)

CREATE TABLE ESTADO (		
	id_estado SERIAL PRIMARY KEY NOT NULL,
	nombre_es VARCHAR(50),
	status_es BOOLEAN,
	id_pais_id INTEGER NOT NULL,
	CONSTRAINT fk_pais_est FOREIGN KEY (id_pais_id) REFERENCES PAIS (id_pais)
)
	
CREATE TABLE MUNICIPIO (
	id_municipio SERIAL PRIMARY KEY NOT NULL,
	nombre_mu VARCHAR(50),
	status_mu BOOLEAN,
	cod_postal_mu INTEGER,
	id_mun_id INTEGER NOT NULL,
	CONSTRAINT fk_mun_est FOREIGN KEY (id_mun_id) REFERENCES ESTADO (id_estado)
)
	
CREATE TABLE PARROQUIA (
	id_parroquia SERIAL PRIMARY KEY NOT NULL,
	nombre_pa VARCHAR(50),
	status_pa BOOLEAN,
	id_pa_id INTEGER NOT NULL,
	CONSTRAINT fk_est_pa FOREIGN KEY (id_pa_id) REFERENCES MUNICIPIO (id_municipio)
)

CREATE TABLE DEPARTAMENTO (
	id_departamento SERIAL PRIMARY KEY NOT NULL,
	nombre_dep VARCHAR(100) NOT NULL,
	status_dep BOOLEAN
)

CREATE TABLE CARGO (
	id_cargos SERIAL PRIMARY KEY NOT NULL,
	nombre_car VARCHAR(100) NOT NULL,
	status_car BOOLEAN,
	tipo_cargo VARCHAR(50),
	id_carg_id INTEGER NOT NULL,
	CONSTRAINT fk_carg_emp FOREIGN KEY (id_carg_id) REFERENCES DEPARTAMENTO (id_departamento)
)

CREATE TABLE EMPLEADO (
	id_empleado SERIAL PRIMARY KEY NOT NULL,    
	cedula_e VARCHAR(12) UNIQUE NOT NULL,
	nombre1_e VARCHAR(50) NOT NULL,
	nombre2_e VARCHAR(50),
	apellido1_e VARCHAR(50) NOT NULL,
	apellido2_e VARCHAR(50),
	fecha_nac_e DATE NOT NULL,
	sexo_e VARCHAR(1) NOT NULL,
	telef_fijo_e VARCHAR(35),
	telef_movil_e VARCHAR(35),
	correo_e VARCHAR(35),
	id_parr_id INTEGER,
	pantalon_e VARCHAR(3),
	camisa_e VARCHAR (3),
	botas_e VARCHAR(2),
	direccion_e VARCHAR(25),
	tipo_personal_e VARCHAR(15),
	jornada_e VARCHAR(15),
	geo_ubicacion VARCHAR(50),
	reg_fotog_e VARCHAR(50),
	reg_biometrico_e VARCHAR(60),
	id_emp_carg INTEGER,
	CONSTRAINT fk_emp_parr FOREIGN KEY (id_parr_id) REFERENCES PARROQUIA (id_parroquia),
	CONSTRAINT fk_emp_carg FOREIGN KEY (id_emp_carg) REFERENCES CARGOS (id_cargos)
)
	
CREATE TABLE EXPEDIENTE (
	id_expediente SERIAL PRIMARY KEY NOT NULL,
	reg_ficha_emp VARCHAR(5),
	fecha_ingreso_emp DATE,
	reg_cv VARCHAR(60),
	reg_cedula VARCHAR(60),
	reg_rif VARCHAR(50),
	reg_carnet_patria VARCHAR(50),
	reg_soporte_dv VARCHAR(50),
	reg_ref_banc VARCHAR(50),
	reg_carnet_covid VARCHAR(50),
	reg_lic_cond VARCHAR(50),
	reg_soporte_viv VARCHAR(50),
	reg_acta_nac_hijos VARCHAR(50),
	reg_ced_padres VARCHAR(50),
	reg_matrim VARCHAR(50),
	reg_exp_med VARCHAR(50),
	id_exp_id INTEGER NOT NULL,
	CONSTRAINT fk_exp_emp FOREIGN KEY (id_exp_id) REFERENCES EMPLEADO (id_empleado)
)

CREATE TABLE FAMILIAR (
	id_familiar SERIAL PRIMARY KEY NOT NULL,
	nombre_f CHAR(50) NOT NULL,
	apellido1_f VARCHAR(50) NOT NULL,
	apellido2_f VARCHAR(50),
	cedula_f VARCHAR(12) NOT NULL,
	fecha_nac_f DATE,
	sexo_f VARCHAR(1) NOT NULL,
	status_f BOOLEAN,
	vinculo_f VARCHAR(15) NOT NULL,
	id_fam_id INTEGER NOT NULL,
	CONSTRAINT fk_fam_emp FOREIGN KEY (id_fam_id) REFERENCES EMPLEADO (id_empleado)
)

CREATE TABLE HORARIO (
	id_horario_e SERIAL PRIMARY KEY NOT NULL,
	horario_llegada TIME NOT NULL,
	horario_salida TIME NOT NULL,
	id_hor_id INTEGER,
	CONSTRAINT fk_hor_emp FOREIGN KEY (id_hor_id) REFERENCES EMPLEADO (id_empleado)
)

CREATE TABLE USUARIO (
	id_usuario SERIAL PRIMARY KEY NOT NULL,
	id_correo VARCHAR(25)  UNIQUE NOT NULL,    
	clave_u VARCHAR(35) NOT NULL,
	perfil_u VARCHAR(30),
	id_us_id INTEGER,
	CONSTRAINT fk_us_emp FOREIGN KEY (id_us_id) REFERENCES EMPLEADO (id_empleado)
)

CREATE TABLE SESION (
	id_sesion SERIAL PRIMARY KEY NOT NULL,
	fecha_s DATE NOT NULL,
	hora_s TIME NOT NULL,
	ip_s VARCHAR(50) NOT NULL,
	create_s DATE NOT NULL, 
	update_s DATE NOT NULL,
	id_ses_id INTEGER NOT NULL,
	CONSTRAINT fk_ses_us FOREIGN KEY (id_ses_id) REFERENCES USUARIO (id_usuario)
)

CREATE TABLE HISTORIAL (
	id_historial SERIAL PRIMARY KEY NOT NULL,
	accion_h VARCHAR(50) NOT NULL,
	tipoacc_h VARCHAR(50) NOT NULL,
	operacion_h VARCHAR(50) NOT NULL,
	create_h TIMESTAMP NOT NULL,
	update_h TIMESTAMP NOT NULL,
	id_hist_id INTEGER NOT NULL,
	CONSTRAINT fk_hist_corr FOREIGN KEY (id_hist_id) REFERENCES USUARIO (id_usuario)
)

CREATE TABLE ASISTENCIA (
	id_asistencia SERIAL PRIMARY KEY NOT NULL,
	fecha_entrada DATE,
	hora_entrada TIME,
	status_a BOOLEAN,
	fecha_salida DATE,
	hora_salida TIME,
	observacion_a VARCHAR(25),
	id_asis_id INTEGER,
	CONSTRAINT fk_asis_emp FOREIGN KEY (id_asis_id) REFERENCES EMPLEADO (id_empleado)
)
	
CREATE TABLE ESTADISTICA (
	id_estadistica SERIAL PRIMARY KEY NOT NULL,
	Fecha_est DATE,
	Mes_est VARCHAR(20),
	Semana_est VARCHAR(20),
	Status_est VARCHAR(20),
	Id_est_id INTEGER NOT NULL,
	CONSTRAINT Fk_est_emp FOREIGN KEY (Id_est_id) REFERENCES EMPLEADO (Id_empleado)
	
) 

CREATE TABLE SOLICITUD (

	Id_solicitud SERIAL PRIMARY KEY NOT NULL,
	Fecha_solic DATE NOT NULL,
	Fecha_inicio_p TIMESTAMP NULL,
	Fecha_fin_p TIMESTAMP NULL,
	Status_solic BOOLEAN,
	Tipo_Ausencia_p VARCHAR(20) NULL,
	Fecha_compen TIMESTAMP NULL,
	Hora_extra TIMESTAMP NULL,
	Id_solic_id INTEGER NOT NULL,
	CONSTRAINT Fk_solic_emp FOREIGN KEY (Id_solic_id) REFERENCES EMPLEADO (Id_empleado)
		
)

CREATE TABLE AUTORIZACION (

	Id_autori SERIAL PRIMARY KEY NOT NULL,
	Nombre_autori VARCHAR (50) NOT NULL,
	Status_autori BOOLEAN,
	Observ_autori VARCHAR(60)

) 

CREATE TABLE VALIDACION (

	Id_validacion SERIAL PRIMARY KEY NOT NULL,
	Status_valid BOOLEAN,
	Jerarq_valid VARCHAR(15),
	Id_valid_solic INTEGER NOT NULL,
	Id_valid_autori INTEGER NOT NULL,
	CONSTRAINT Fk_valid_solic FOREIGN KEY (Id_valid_solic) REFERENCES SOLICITUD (Id_solicitud),
	CONSTRAINT Fk_valid_autori FOREIGN KEY (Id_valid_autori) REFERENCES AUTORIZACION (Id_autori)

)
