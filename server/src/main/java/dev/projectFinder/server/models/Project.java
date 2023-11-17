package dev.projectFinder.server.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "projects")
public class Project {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId projectId;
    private String projectName;
    private String description;
    private ObjectId ownerId;
    private int maxParticipants;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    private LocalDateTime starDate;
    private String duration;
    private String status;
    private String budget;
    private ObjectId[] participants;
    private ObjectId[] favouriteUsers;
    private ObjectId[] vacancies;



}
