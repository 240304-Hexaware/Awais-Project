package com.Parser.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "parse_files")
public class ParseFile {

    @Id
    private String id;
    @Field("file_name")
    private String fileName;
    @Field("user")
    private String user;
    @Field("specification_name")
    private String specificationName;
    @Field("specification_id")
    private String specificationId;

}
