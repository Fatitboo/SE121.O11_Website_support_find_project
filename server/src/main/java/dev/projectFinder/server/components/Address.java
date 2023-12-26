package dev.projectFinder.server.components;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Address {
    private String country;
    private String province;
    private String district;
    private String ward;
    private String addressDetail;
}
