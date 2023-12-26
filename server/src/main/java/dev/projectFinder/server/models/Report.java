package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "reports")
public class Report {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId reportId;
    private String fromId;
    private String toId;
    private String vacOrProjId;
    private String reportType;
    private String additionalInformation;
    private Boolean isVacancy;
    private String avatar;
    private String orgName;
    @CreatedDate
    private LocalDateTime createdAt;
}
