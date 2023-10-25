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
public class UserDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Full name is required")
    @JsonProperty("fullname")
    private String fullName;

    @NotBlank(message = "Password cannot blank")
    private String password;

    @JsonProperty("confirm_password")
    private String cPassword;

    @JsonProperty("is_verify")
    private Boolean isVerify;

    @NotBlank(message = "UserType is required")
    private String userType;

    @JsonProperty("google_account_id")
    private int googleAccountId;
}
