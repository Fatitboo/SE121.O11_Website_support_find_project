package dev.projectFinder.server.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ViewsProfile {
    // 01/2024
    private String viewsId ;
    private int numOfViews;
}
