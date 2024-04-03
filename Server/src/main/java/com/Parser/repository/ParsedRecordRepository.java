package com.Parser.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Parser.dto.GroupRecordDTO;
import com.Parser.entity.ParsedRecord;

@Repository
public interface ParsedRecordRepository extends MongoRepository<ParsedRecord, String> {

    @Aggregation({
            "{ $group: { _id: '$specification_id',  name: { $first: '$specification_name' }, records: { $push: '$fields' } }}",
            "{ $project: { name: { $substr: [ '$name', 0, { $subtract: [{ $strLenCP: '$name' }, 5] } ] }, records: '$records' }}",
            "{ $sort: { name: 1 } }" })
    public List<GroupRecordDTO> groupBySpecFile();

    @Aggregation({
            "{ $group: { _id: '$parse_file_id',  name: { $first: '$parse_file_name' }, records: { $push: '$fields' } }}",
            "{ $project: { name: { $substr: [ '$name', 0, { $subtract: [{ $strLenCP: '$name' }, 4] } ] }, records: '$records' }}",
            "{ $sort: { name: 1 } }" })
    public List<GroupRecordDTO> groupByParseFile();

    @Aggregation({
            "{ $group: { _id: '$user', records: { $push: '$fields' } }}" })
    public List<GroupRecordDTO> groupByUser();

}
