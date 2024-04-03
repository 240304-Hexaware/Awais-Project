package com.Parser.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupRecordDTO {

    private String id;
    private String name;
    private List<Map<String, Object>> records;
}
