package com.Parser.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String taskID;
    private String description;
    private String priority;
    private String dueDate;
    private String assignee;

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
