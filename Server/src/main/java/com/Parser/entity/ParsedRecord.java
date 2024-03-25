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
@Document(collection = "parsed_record")
public class ParsedRecord {

    @Id
    private String id;
    @Field("taskID")
    private String taskID;
    @Field("description")
    private String description;
    @Field("priority")
    private String priority;
    @Field("dueDate")
    private String dueDate;
    @Field("assignee")
    private String assignee;
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

    public void setField(String fieldName, String fieldValue) {
        switch (fieldName) {
            case "taskId":
                this.taskID = fieldValue;
                break;
            case "description":
                this.description = fieldValue;
                break;
            case "priority":
                this.priority = fieldValue;
                break;
            case "dueDate":
                this.dueDate = fieldValue;
                break;
            case "assign":
                this.assignee = fieldValue;
                break;
            default:
                // Handle unknown field
                System.err.println("Unknown field: " + fieldName);
        }
    }

}
