package dev.projectFinder.server.components.Vacancy;

import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import lombok.*;

import java.util.Arrays;
import java.util.HashMap;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobDetail {
    private Combobox[] jobTypes;
    private String length;
    private Combobox period;
    private Combobox showBy;
    private String showBy_1;
    private String showBy_2;
    public HashMap<String, Object> spreadString(){
        HashMap<String, Object> hash = new HashMap<>();
        hash.put("timeRequires", Arrays.stream(jobTypes).map(Combobox::getName).toArray());
        hash.put("timeLength", length);
        hash.put("timePeriod", period.getName());
        hash.put("timeType", showBy.getName());
        hash.put("timeFirst", showBy_1);
        hash.put("timeSecond", showBy_2);
        return hash;
    }
}
