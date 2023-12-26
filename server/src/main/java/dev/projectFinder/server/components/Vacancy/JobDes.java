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
public class JobDes {
    private String description;
    private String[] skills;
    public HashMap<String, Object> spreadString(){
        HashMap<String, Object> hash = new HashMap<>();
        hash.put("skillsRequired", skills);
        hash.put("description", description);
        return hash;
    }
}