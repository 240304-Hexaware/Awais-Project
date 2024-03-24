package com.Parser.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "specifications")
public class Specification {

    @Id
    private String id;

    @Field("file_name")
    private String fileName;

    private String json;

    @Field("file_path")
    private String filePath;

    @Field("parse_files_id")
    private List<String> parseFilesId;

}
