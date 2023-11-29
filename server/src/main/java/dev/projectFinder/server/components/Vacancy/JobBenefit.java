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
public class JobBenefit {
    public String pay_1;
    public String pay_2;
    public Combobox rate;
    public Combobox showPayBy;

    private String salaryType;
    private double salaryFirst;
    private double salarySecond;
    private double salaryRate;

    public HashMap<String, Object> spreadString(){
        HashMap<String, Object> hash = new HashMap<>();
        hash.put("salaryType", showPayBy.getName());
        hash.put("salaryFirst", pay_1);
        hash.put("salarySecond", pay_2);
        hash.put("salaryRate", rate.getName());
        return hash;
    }
}
