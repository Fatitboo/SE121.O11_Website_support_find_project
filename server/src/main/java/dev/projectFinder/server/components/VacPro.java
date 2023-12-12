package dev.projectFinder.server.components;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VacPro {
    private String vacProId;
    private String avt;
    private String orgName;
    private Boolean isVacancy;
    private String address;
    private String vacProName;
    private LocalDateTime createdAt;
    private String duration;
    private String[] fields;
    private String des;
    private List<String> reports;

}
