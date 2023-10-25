package dev.projectFinder.server.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.projectFinder.server.models.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("user")
    private User user;
}
