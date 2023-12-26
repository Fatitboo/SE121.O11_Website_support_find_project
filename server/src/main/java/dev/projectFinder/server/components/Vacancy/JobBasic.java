package dev.projectFinder.server.components.Vacancy;

import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import lombok.*;

import java.util.HashMap;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobBasic {
    private String jobTitle;
    private String location;
    private Combobox numberParticipants;
    private Combobox require;
    private Combobox type;

    public HashMap<String, Object> spreadString(){
        HashMap<String, Object> hash = new HashMap<>();
        hash.put("vacancyName", jobTitle);
        hash.put("maxRequired", numberParticipants.getName());
        hash.put("locationType", type.getName());
        hash.put("location", location);
        hash.put("locationSpecificRequired", type.isValue());
        return hash;
    }
}
