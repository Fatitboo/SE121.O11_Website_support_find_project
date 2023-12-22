package dev.projectFinder.server.models;

import dev.projectFinder.server.components.Payment.PaymentProjectDetail;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectOrder {

    private double price;
    private String currency;
    private String method;
    private String intent;
    private String description;
    private String projectId;
    private int length;
    private List<PaymentProjectDetail> detail;
}
