import { AuditResult } from "@/lib/audit/types";
import { SUMMARY_PROMPT } from "./prompts";

/**
 * Generates an executive summary for the audit.
 * Priorities: Hugging Face (Free) -> Fallback (Deterministic)
 */
export async function generateExecutiveSummary(result: AuditResult): Promise<string> {
  const hfKey = process.env.HUGGINGFACE_API_KEY;

  if (hfKey) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
        {
          headers: {
            Authorization: `Bearer ${hfKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: SUMMARY_PROMPT(result),
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim();
      }
      
      // If HF returns a weird response, throw to trigger fallback
      throw new Error("Invalid response from Hugging Face");
    } catch (error) {
      console.error("[AI Summary] Hugging Face failed, using fallback.", error);
    }
  }

  // Final fallback: Deterministic summary
  return getDeterministicSummary(result);
}

/**
 * A templated summary that remains financially credible.
 * Used when AI fails or during initial development.
 */
function getDeterministicSummary(result: AuditResult): string {
  const { companyName, annualSavings, summaryMetadata, recommendations } = result;
  
  if (recommendations.length === 0) {
    return `Based on our comprehensive analysis, ${companyName}'s AI tooling stack is currently highly optimized. We found no significant overlaps or plan-to-usage misalignments. Maintaining this level of fiscal discipline as you scale will be key to long-term efficiency.`;
  }

  const topTool = summaryMetadata.topSavingOpportunity || "multiple tools";
  const savingsPct = summaryMetadata.potentialSavingsPercentage;

  return `Our audit of ${companyName}'s AI stack has identified a potential annual saving of $${annualSavings.toLocaleString()}, representing a ${Math.round(savingsPct)}% reduction in current spend. The primary optimization opportunity lies within ${topTool}. By consolidating redundant licenses and right-sizing team-tier plans, the organization can reallocate significant budget without compromising on the quality of AI-powered workflows. We recommend immediate action on high-priority items to capture these efficiencies.`;
}
