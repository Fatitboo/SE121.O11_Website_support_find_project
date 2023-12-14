package dev.projectFinder.server.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {

    private double price;
    private String currency;
    private String method;
    private String intent;
    private String description;
}
