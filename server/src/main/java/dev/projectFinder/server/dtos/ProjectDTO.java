package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import dev.projectFinder.server.models.Project;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectDTO {
    private String projectName;
    private String description;
    private ObjectId userId;
    private int maxParticipants;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    private String duration;
    private String period;
    private String status;
    private String budget;
    private String[] participants;
    private String[] favouriteUsers;
    private String[] vacancies;
    private String[] occupations;
    public ProjectDTO(Project project){
        projectName = project.getProjectName();
        description = project.getDescription();
        maxParticipants = project.getMaxParticipants();
        fbLink = project.getFbLink();
        twLink = project.getTwLink();
        lkLink = project.getLkLink();
        insLink = project.getInsLink();
        startDate = project.getStartDate();
        duration = project.getDuration();
        period = project.getPeriod();
        status = project.getStatus();
        budget = project.getBudget();
        occupations = project.getOccupations();


        List<String> a = new ArrayList<>();
        for(int i = 0; i < project.getVacancies().length; i++) {
            a.add(project.getVacancies()[i].toString());
        }
        vacancies = a.toArray(new String[0]);
    }
}
