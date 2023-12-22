package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectHistoryDTO {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId projectId;
    private String projectName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    private String duration;
    private String period;
    private int maxParticipants;
    // date create and update
    private String budget;
    private LocalDateTime createdAt;
    private List<VacancyHistoryDTO> vacancies;
}
