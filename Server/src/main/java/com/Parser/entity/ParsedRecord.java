package com.Parser.entity;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "parsed_record")
public class ParsedRecord {

    @Id
    private String id;

    @Field("fields")
    private Map<String, Object> fields;

    @Field("user")
    private String user;
    @Field("specification_name")
    private String specificationName;
    @Field("specification_id")
    private String specificationId;
    @Field("parse_file_name")
    private String parseFileName;
    @Field("parse_file_id")
    private String parseFileId;

}
