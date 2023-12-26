package dev.projectFinder.server.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {

    @NotBlank(message = "Username is required")
    @NotNull(message = "Username is required")
    private String username;

    @NotBlank(message = "Full name is required")
    @JsonProperty("fullname")
    @NotNull(message = "Full name is required")
    private String fullName;

    private String email;

    @NotBlank(message = "Password cannot blank")
    @NotNull(message = "Password cannot null")
    private String password;

    @JsonProperty("confirm_password")
    @NotNull(message = "Confirm Password cannot null")
    private String cPassword;

    @JsonProperty("is_verify")
    private Boolean isVerify;

    @NotBlank(message = "UserType is required")
    @NotNull(message = "UserType cannot null")
    private String userType;

    @JsonProperty("google_account_id")
    private int googleAccountId;
}
