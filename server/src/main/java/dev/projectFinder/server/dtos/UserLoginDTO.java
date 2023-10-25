package dev.projectFinder.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserLoginDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password cannot blank")
    private String password;

    @NotBlank(message = "UserType is required")
    private String userType;
}
