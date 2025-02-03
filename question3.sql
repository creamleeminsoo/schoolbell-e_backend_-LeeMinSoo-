CREATE TABLE user(
    user_id BIGINT AUTO_INCREMENT,
    auth_level CHAR(1) ,

    CONSTRAINT chk_auth_level CHECK(auth_level IN('0','1','2','3')),
    PRIMARY KEY(user_id),

);
CREATE TABLE document(
    document_id BIGINT AUTO_INCREMENT,
    author_id BIGINT NOT NULL,
    title VARCHAR(50),
    content TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    document_status CHAR(1) DEFAULT '0',
    FOREIGN KEY (author_id) REFERENCES user(user_id) ON DELETE CASCADE,
    CONSTRAINT chk_document_status CHECK(document_status IN('0','1','2','3')),
    PRIMARY KEY(document_id)
);

CREATE TABLE approval(
    approval_id BIGINT AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    approval_step CHAR(1) DEFAULT '1',
    approval_at DATETIME,
    approval_status CHAR(1) DEFAULT '0',
    approver_id BIGINT DEFAULT NULL,

    CONSTRAINT chk_approval_step CHECK (approval_step IN ('1', '2', '3')),
    CONSTRAINT chk_approval_status CHECK (approval_status IN ('0', '1', '2')),
    FOREIGN KEY (document_id) REFERENCES document(document_id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES user(user_id) ON DELETE CASCADE,
 
    PRIMARY KEY(approval_id)
);

SELECT 
    doc.document_id AS document_id, 
    doc.title AS document_title, 
    appr.approval_step, 
    appr.approval_status 
FROM document doc  
JOIN approval appr ON doc.document_id = appr.document_id
WHERE appr.approval_status = 0  
AND appr.approval_step = (SELECT auth_level FROM user WHERE user_id = 0)
ORDER BY doc.created_at ASC
;
