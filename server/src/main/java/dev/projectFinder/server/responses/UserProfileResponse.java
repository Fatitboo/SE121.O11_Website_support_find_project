package dev.projectFinder.server.responses;

import dev.projectFinder.server.components.Address;
import dev.projectFinder.server.components.CVLink;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileResponse {
    private CVLink avatar;
    private String fullName;
    private String phoneNumber;
    private String email;
    private LocalDateTime dayOfBirth;
    private String website;
    private String description;
    private String fbLink;
    private String twLink;
    private String lkLink;
    private String insLink;
    private Address address;
    private String teamSize;
    private String expectSalary;

}
