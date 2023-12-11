package dev.projectFinder.server.components.Vacancy.Combobox;

import lombok.*;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Combobox {
    private int id;
    private String name;
    private boolean value;
    private String des;
    private boolean required;
    private boolean dealBreakerBox;
}
