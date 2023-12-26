package dev.projectFinder.server.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Recommend {
    private String recommendId;
    private String recommendName;
    private String duration;
    private String[] fields;
    private String recommendType;
}
