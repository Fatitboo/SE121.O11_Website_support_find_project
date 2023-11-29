package dev.projectFinder.server.components.Vacancy;

import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import dev.projectFinder.server.models.User;
import lombok.*;

import java.util.HashMap;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobRef {
    private boolean emailApply;
    private boolean emailContact;
    private String[] emails;
    private Combobox hiringTimeline;
    private Combobox resume;

    public HashMap<String, Object> spreadString(){
        HashMap<String, Object> hash = new HashMap<>();
        hash.put("emailReceivers", emails);
        hash.put("canReceiveApplied", emailApply);
        hash.put("canContactViaEmail", emailContact);
        hash.put("requireResume", resume.isValue());
        hash.put("hiringTimeline", hiringTimeline.getName());
        return hash;
    }
}