package dev.projectFinder.server.dtos;

import lombok.*;
import org.bson.types.ObjectId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReportDTO {
    private Boolean isVacancy;
    private String fromId;
    private String toId;
    private String vacOrProjId;
    private String reportType;
    private String additionalInformation;
    private String avatar;
    private String orgName;
}
