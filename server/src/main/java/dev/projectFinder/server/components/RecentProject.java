package dev.projectFinder.server.components;

import dev.projectFinder.server.models.Project;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecentProject {
    private Project project;
    private String corName;
    private String corLogo;
    private String corAddress;
}
