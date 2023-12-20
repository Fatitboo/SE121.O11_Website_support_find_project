package dev.projectFinder.server.components;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AppliedVacancy {
    private String vacancyId;
    private LocalDateTime appliedDate;
    private String status;
}
