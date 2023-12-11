package dev.projectFinder.server.components.Vacancy;

import dev.projectFinder.server.components.Vacancy.Combobox.Combobox;
import lombok.*;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobPreScreen {
//    Chung
    private int tagId;
    private String tagName;
    private String type;
    private String boxType;
    private String question;
    private boolean dealBreakerBox;
    private boolean required;
    private boolean multi;
//  info,
    private String answerRequire;
// radio, select
    private String preAnswer;
    private Combobox[] selectList;
    private Combobox[] selectedItem;
// select - text
    private String textIndent;

    private String value;

//  answer
    private String answerType;
    private Combobox[] result;


}

