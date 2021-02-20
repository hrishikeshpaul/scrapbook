package com.iu.scrapbook.document;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.List;

/**
 * @author jbhushan
 */
@Document
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Album {

    @MongoId
    private String id;
    private String googleDriveId;
    private String description;
    private String name;
    private long size;
    @CreatedDate
    private Instant createdDate;
    private Instant modifiedDate;
    private String createdBy;
    @LastModifiedDate
    private String modifiedBy;
    private boolean active;
    //private List<Image> images;
}
