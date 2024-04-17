CREATE TABLE PAIS (			--TABLA PAIS DONE
	id_pais SERIAL PRIMARY KEY,
	nombre_pais VARCHAR(50) NOT NULL,
	status_pais BOOLEAN NOT NULL
)   
	
CREATE TABLE ESTADO (		-- TABLA ESTADO DONE
	id_estado SERIAL PRIMARY KEY,
	nombre_es VARCHAR(50),
	status_es BOOLEAN NOT NULL,
	id_pais_id INTEGER NOT NULL,
	CONSTRAINT fk_pais_est FOREIGN KEY (id_pais_id) REFERENCES PAIS (id_pais)
)
	
CREATE TABLE MUNICIPIO (   -- TABLA MUNICIPIO DONE
    id_municipio SERIAL PRIMARY KEY,
    nombre_mu VARCHAR(50) NOT NULL,
    status_mu BOOLEAN NOT NULL,
	cod_postal_mu INTEGER,
    id_estado_id INTEGER NOT NULL,
    CONSTRAINT fk_estado_mun FOREIGN KEY (id_estado_id) REFERENCES ESTADO (id_estado)
);

CREATE TABLE PARROQUIA (   -- TABLA PARROQUIA DONE
	id_parroquia SERIAL PRIMARY KEY,
	nombre_pa VARCHAR(50) NOT NULL,
	status_pa BOOLEAN NOT NULL,
	id_municipio_id INTEGER NOT NULL,
	CONSTRAINT fk_municipio_parr FOREIGN KEY (id_municipio_id) REFERENCES MUNICIPIO (id_municipio)
)

CREATE TABLE DEPARTAMENTO (    -- TABLA DEPARTAMENTO DONE
	id_departamento SERIAL PRIMARY KEY,
	nombre_dep VARCHAR(100) NOT NULL,
	status_dep VARCHAR(15) NOT NULL
)

CREATE TABLE CARGO ( -- TABLA CARGOS DONE
	id_cargo SERIAL PRIMARY KEY,
	nombre_car VARCHAR(50) NOT NULL,
	status_car BOOLEAN NOT NULL,
	tipo_cargo VARCHAR(50),
	id_departamento_id INTEGER NOT NULL,
	CONSTRAINT fk_carg_dep FOREIGN KEY (id_departamento_id) REFERENCES DEPARTAMENTO (id_departamento)
)

CREATE TABLE EMPLEADO (
    -- Datos Primordiales
	id_empleado SERIAL PRIMARY KEY NOT NULL,
	cedula_e VARCHAR(20) UNIQUE NOT NULL,
	nombre1_e VARCHAR(50) NOT NULL,
	nombre2_e VARCHAR(50),
	apellido1_e VARCHAR(50) NOT NULL,
	apellido2_e VARCHAR(50),
	fecha_nac_e DATE NOT NULL,
	sexo_e VARCHAR(20),
	-- Datos de contacto
	telef_fijo_e VARCHAR(35),
	telef_movil_e VARCHAR(35),
	correo_e VARCHAR(100),
	id_parroquia_id INTEGER,
	direccion_e VARCHAR(255),
	-- Datos de uniformes
	pantalon_e VARCHAR(20),
	camisa_e VARCHAR(20),
	botas_e VARCHAR(20),
	-- Datos de trabajo
	id_cargo_id INTEGER,
	tipo_per_e VARCHAR(15),
	jornada_e VARCHAR(20),
	-- Datos caracteristicos
	geo_ubicacion VARCHAR(35),
	reg_fotog_e VARCHAR(60),
	reg_biometrico_e INTEGER, 
	CONSTRAINT fk_emp_parr FOREIGN KEY (id_parroquia_id) REFERENCES PARROQUIA (id_parroquia),
	CONSTRAINT fk_emp_carg FOREIGN KEY (id_cargo_id) REFERENCES CARGO (id_cargo),
	CONSTRAINT fk_biometrico_emp FOREIGN KEY (reg_biometrico_e) REFERENCES BIOMETRICO (uid)
)

CREATE TABLE USUARIO (
    id_usuario SERIAL PRIMARY KEY NOT NULL,
    id_correo VARCHAR(100) UNIQUE NOT NULL,
    clave_u VARCHAR(100) NOT NULL,
    create_u TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_u TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_empleado_id INTEGER NOT NULL,
	id_rol_id INTEGER,
    CONSTRAINT fk_us_emp FOREIGN KEY (id_empleado_id) REFERENCES EMPLEADO (id_empleado)
	fk_us_rol FOREIGN KEY (id_rol_id) REFERENCES ROL (id_rol)
);

CREATE TABLE SESION (
    id_sesion SERIAL PRIMARY KEY NOT NULL,
    fecha_s DATE NOT NULL,
    hora_s TIME NOT NULL,
    ip_s VARCHAR(50) NOT NULL,
    create_s TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_s TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_usuario_id INTEGER NOT NULL,
    CONSTRAINT fk_ses_us FOREIGN KEY (id_usuario_id) REFERENCES USUARIO (id_usuario)
);

CREATE TABLE ROL (
	id_rol SERIAL PRIMARY KEY NOT NULL,
	nombre_rol VARCHAR(50) NOT NULL,
	create_r TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_r TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	descripcion_rol VARCHAR(50) NOT NULL
)


CREATE TABLE ASISTENCIA (
	id_asistencia SERIAL PRIMARY KEY NOT NULL,
	fecha_asistencia DATE NOT NULL,
	hora_asistencia TIME NOT NULL,
	tipo_asistencia VARCHAR(30) NOT NULL,
	observacion_a VARCHAR(150),
	id_empleado_id INTEGER NOT NULL,
	CONSTRAINT fk_asis_emp FOREIGN KEY (id_empleado_id) REFERENCES EMPLEADO (id_empleado)
)

CREATE TABLE BIOMETRICO (
	id_usuario_b SERIAL PRIMARY KEY NOT NULL,
	uid INTEGER UNIQUE NOT NULL,
	userid VARCHAR(10) UNIQUE NOT NULL,
	name VARCHAR(20) NOT NULL,
	password VARCHAR(20),
	role INTEGER,
	cardno VARCHAR(8)
)

























CREATE TABLE EXPEDIENTE (

	Reg_cv VARCHAR(60) NOT NULL,
	Reg_cedula VARCHAR(60) NOT NULL,
	Reg_rif VARCHAR(50) NOT NULL,
	Reg_soporte_dv VARCHAR(50) NOT NULL,
	Reg_ref_banc VARCHAR(50) NOT NULL,
	Reg_carnet_covid VARCHAR(50) NOT NULL,
	Reg_lic_cond VARCHAR(50) NOT NULL,
	Reg_soporte_viv VARCHAR(50) NOT NULL,
	Reg_acta_nac_hijos VARCHAR(50) NOT NULL,
	Reg_ced_padres VARCHAR(50) NOT NULL,
	Reg_matrim VARCHAR(50) NOT NULL,
	Reg_exp_med VARCHAR(50) NOT NULL,
	Id_exp_emp VARCHAR(50),
	CONSTRAINT Fk_exp_emp FOREIGN KEY (Id_exp_emp) REFERENCES EMPLEADO (Id_empleado)

)


CREATE TABLE FAMILIAR (

	Id_familiar VARCHAR(50) PRIMARY KEY NOT NULL,
	Nombre_f CHAR(50) NOT NULL,
	Apellido1_f CHAR(50) NOT NULL,
	Apellido2_f CHAR(50) NOT NULL,
	Cedula_f INTEGER NOT NULL,
	Sexo_f CHAR(10) NOT NULL,
	Status_f CHAR(15) NOT NULL,
	Vinculo_f CHAR(15),
	Id_fam_emp VARCHAR(50),
	CONSTRAINT Fk_fam_emp FOREIGN KEY (Id_fam_emp) REFERENCES EMPLEADO (Id_empleado)
	

)

ALTER TABLE EMPLEADO ADD COLUMN Id_emp_fam VARCHAR(50) NOT NULL

ALTER TABLE EMPLEADO ADD FOREIGN KEY (Id_emp_fam) REFERENCES FAMILIAR (Id_familiar)

CREATE TABLE HORARIO (

	Id_horario_e VARCHAR(50) PRIMARY KEY NOT NULL,
	Horario_llegada TIME,
	Horario_salida TIME,
	Id_hor_emp VARCHAR(50),
	CONSTRAINT Fk_hor_emp FOREIGN KEY (Id_hor_emp) REFERENCES EMPLEADO (Id_empleado)

)


	

CREATE TABLE HISTORIAL (

	Id_historial VARCHAR(50)PRIMARY KEY NOT NULL,
	Accion_h VARCHAR(50) NOT NULL,
	Tipoacc_h VARCHAR(50) NOT NULL,
	Operacion_h VARCHAR(50) NOT NULL,
	Create_s TIMESTAMP NOT NULL,
	Update_s TIMESTAMP NOT NULL,
	Id_hist_corr VARCHAR(50) NOT NULL,
	CONSTRAINT Fk_hist_corr FOREIGN KEY (Id_hist_corr) REFERENCES USUARIO (Id_correo)
	
)


CREATE TABLE ESTADISTICAS (

	Id_estadistica VARCHAR(50) PRIMARY KEY NOT NULL,
	Fecha_est DATE NOT NULL,
	Mes_est CHAR(20) NOT NULL,
	Semana_est CHAR(20) NOT NULL,
	Status_est VARCHAR(20) NOT NULL,
	Id_est_emp VARCHAR(50) NOT NULL,
	CONSTRAINT Fk_est_emp FOREIGN KEY (Id_est_emp) REFERENCES EMPLEADO (Id_empleado)
	
)  

CREATE TABLE SOLICITUD (

	Id_solicitud VARCHAR(50) PRIMARY KEY NOT NULL,
	Fecha_solic DATE NOT NULL,
	Fecha_inicio_p TIMESTAMP NULL,
	Fecha_fin_p TIMESTAMP NULL,
	Status_solic VARCHAR(15),
	Tipo_Ausencia_p VARCHAR(20) NULL,
	Fecha_compen TIMESTAMP NULL,
	Hora_extra TIMESTAMP NULL,
	Id_solic_emp VARCHAR(50),
	CONSTRAINT Fk_solic_emp FOREIGN KEY (Id_solic_emp) REFERENCES EMPLEADO (Id_empleado)
		
)

CREATE TABLE AUTORIZACION (

	Id_autori VARCHAR(50) PRIMARY KEY NOT NULL,
	Nombre_autori VARCHAR (50) NOT NULL,
	Status_autori VARCHAR(20) NOT NULL,
	Observ_autori VARCHAR(60) NOT NULL

)  

CREATE TABLE VALIDACION (

	Id_validacion VARCHAR(50) PRIMARY KEY NOT NULL,
	Status_valid VARCHAR(20) NOT NULL,
	Jerarq_valid VARCHAR(15) NOT NULL,
	Id_valid_solic VARCHAR(50) NOT NULL,
	Id_valid_autori VARCHAR(50) NOT NULL,
	CONSTRAINT Fk_valid_solic FOREIGN KEY (Id_valid_solic) REFERENCES SOLICITUD (Id_solicitud),
	CONSTRAINT Fk_valid_autori FOREIGN KEY (Id_valid_autori) REFERENCES AUTORIZACION (Id_autori)

)