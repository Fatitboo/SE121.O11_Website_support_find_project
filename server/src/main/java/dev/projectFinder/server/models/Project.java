package dev.projectFinder.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import dev.projectFinder.server.components.Payment.PaymentProjectDetail;
import dev.projectFinder.server.dtos.ProjectDTO;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private int maxParticipants;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    private String duration;
    private String period;
    // 1. first created : pending
    // 2. Admin browser => rejected + waitPayment
    // 3. Cor payment => success => approved
    //                  fail => waitPayment
    // Report => Admin set => cancel
    private String status;
    private String budget;
    private ObjectId[] participants;
    private ObjectId[] vacancies;
    private String[] occupations;
    private List<String> reports;
    private List<String> favouriteUsers;
    private int length;
    private LocalDateTime datePost;
    //Dung cho payment
    private List<PaymentProjectDetail> detail;
    // date create and update
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public void initValue(ProjectDTO projectDTO, String id){
        projectName = projectDTO.getProjectName();
        description = projectDTO.getDescription();
        userId = new ObjectId(id);
        maxParticipants = projectDTO.getMaxParticipants();
        fbLink = projectDTO.getFbLink();
        twLink = projectDTO.getTwLink();
        lkLink = projectDTO.getLkLink();
        insLink = projectDTO.getInsLink();
        startDate = projectDTO.getStartDate();
        duration = projectDTO.getDuration();
        period = projectDTO.getPeriod();
        status = projectDTO.getStatus();
        budget = projectDTO.getBudget();

        List<ObjectId> a = new ArrayList<>();
        for(int i = 0; i < projectDTO.getVacancies().length; i++) {
            a.add(new ObjectId(projectDTO.getVacancies()[i]));
        }
        vacancies = a.toArray(new ObjectId[0]);
        occupations = projectDTO.getOccupations();
    }
    public void setValue(ProjectDTO projectDTO){
        projectName = projectDTO.getProjectName();
        description = projectDTO.getDescription();
        maxParticipants = projectDTO.getMaxParticipants();
        fbLink = projectDTO.getFbLink();
        twLink = projectDTO.getTwLink();
        lkLink = projectDTO.getLkLink();
        insLink = projectDTO.getInsLink();
        startDate = projectDTO.getStartDate();
        duration = projectDTO.getDuration();
        period = projectDTO.getPeriod();
        status = projectDTO.getStatus();
        budget = projectDTO.getBudget();

        List<ObjectId> a = new ArrayList<>();
        for(int i = 0; i < projectDTO.getVacancies().length; i++) {
            a.add(new ObjectId(projectDTO.getVacancies()[i]));
        }
        vacancies = a.toArray(new ObjectId[0]);
        occupations = projectDTO.getOccupations();
    }
}
