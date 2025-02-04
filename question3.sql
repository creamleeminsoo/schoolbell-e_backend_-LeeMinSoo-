
-- 1, 결재 시스템 DB모델링

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

    INDEX idx_approval_step_status_at(approval_step,approval_status,approval_at),
 
    PRIMARY KEY(approval_id)
);


-- 2,특정 사용자가 처리해야 할 결재 건을 나열하는 query

 SELECT
    appr.approval_at,
    doc.document_id AS document_id,
    doc.title AS document_title,
    appr.approval_step,
    appr.approval_status 
FROM approval appr
JOIN document doc ON appr.document_id = doc.document_id
WHERE appr.approval_step = (SELECT auth_level FROM user WHERE user_id = 13)
AND appr.approval_status = '0'
ORDER BY appr.approval_at ASC;










