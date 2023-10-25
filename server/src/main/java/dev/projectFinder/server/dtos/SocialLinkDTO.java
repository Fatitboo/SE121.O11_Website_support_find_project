package dev.projectFinder.server.dtos;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SocialLinkDTO {
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
}
