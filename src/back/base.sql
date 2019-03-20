CREATE TABLE IF NOT EXISTS sections (
	SectionId int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Image varchar(255)
);

CREATE TABLE IF NOT EXISTS goods (
	GoodId int(20) PRIMARY KEY AUTO_INCREMENT,
    SectionId int(20),
    Name varchar(255) NOT NULL,
    Price float(10,1),
    Description text NULL,
    Image varchar(255) NOT NULL,
    Color varchar(200) NULL,
    
    CONSTRAINT ds_fk FOREIGN KEY(SectionId) REFERENCES sections(SectionId)
);

CREATE TABLE IF NOT EXISTS sales (
	SaleId int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Description text NOT NULL,
    Price float(10,1),
    Image varchar(255)
);

CREATE TABLE IF NOT EXISTS users (
	UserId int(20) PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255),
    Email varchar(255) UNIQUE,
    Phone varchar(255),
    Password varchar(255),
    IsAdmin bit DEFAULT 0,
    INDEX em_p_IX (Email, Password) 
);

CREATE TABLE IF NOT EXISTS deals (
	DealId int(20) PRIMARY KEY AUTO_INCREMENT,
    UserId int(20),
    Country int(20),
    City int(20),
    Address int(20),
    PostIndex int(20),
    PayType varchar(20),
    DeliverType varchar(20),
    CreateDate datetime DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT du_fk FOREIGN KEY(UserId) REFERENCES users(UserId)
);

CREATE TABLE IF NOT EXISTS dealsgoods (
	DealId int(20),
    GoodId int(20),
    Type varchar(255),
    Count int(20),
    
    CONSTRAINT dg_pk PRIMARY KEY(DealId, GoodId, Type),
    CONSTRAINT dgd_fk FOREIGN KEY(DealId) REFERENCES deals(DealId)
);



