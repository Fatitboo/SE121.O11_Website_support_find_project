package dev.projectFinder.server.components.Vacancy;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInfo {
    private String userId;
    private String avatar;
    private String fullName;
}
