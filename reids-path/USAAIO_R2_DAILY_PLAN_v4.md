# USAAIO Round 2 Daily Prep Plan — Reid Sendroff

**Competition: April 4–5, 2026 at MIT**
**Start date: March 7, 2026 | Days remaining: 28**
**Time budget: ~1.5–2 hours on school days, ~3–4 hours on weekends/spring break**
**Total estimated hours: ~85–95**

---

## 🥇 The Goal: Gold Medal at MIT

Round 1 score: 107 (Honor Roll). Actual performance: **High Honor Roll level** — a grading error on Problem #5 cost points that were fully earned. That baseline is the floor, not the ceiling.

The gap between Honor Roll and Gold is not talent. It is the specific derivations and implementations on this page, drilled until they are automatic. Score is the sum of mechanics repeated until they require no thought.

**28 days. ~90 hours. 4 pillars. 5 syllabus gaps. One goal.**

---

## Score Conversion Map — Use This When Tired

When time is short, this table decides where the next hour goes. Point probability is based on 2025 Round 2 patterns and the 2026 syllabus.

| Topic | Point Probability |
|-------|------------------|
| Transformer derivation (attention, gradients) → theory points | **HIGH** |
| Encoder block from memory → implementation points | **HIGH** |
| VAE from memory + ELBO derivation → theory + implementation | **HIGH** |
| GAN objective, mode collapse, WGAN → short-answer | **HIGH** |
| Full-task pipeline in 75 min on GPU → pipeline points | **HIGH** |
| Kernel proof + PAC bound derivation → proof points | **MEDIUM-HIGH** |
| SVM dual + KKT (why α_i > 0 for support vectors) → theory | **MEDIUM-HIGH** |
| Softmax + CE gradient, backprop through affine layer | **MEDIUM-HIGH** |
| Diffusion forward/reverse + UNet skeleton → conceptual + code | **MEDIUM** |
| CLIP / InfoNCE + SD text conditioning → differentiation points | **MEDIUM (differentiation)** |
| Reasoning sections: justify loss, init, optimizer choice | **MEDIUM (writeup credit)** |
| FlashAttention, LoRA, ViT, TransformerLens | **LOW — bonus only** |
| Papers With Code browsing, ecosystem knowledge | **DO NOT TOUCH** |

---

## Resource Time Cap — Hard Rules

Reading feels like progress. It is not.

```
≤ 25 min   Primary paper or note — read the section needed, then close it
≤ 20 min   One implementation reference — study the key lines, then close it
≥ 30 min   Rebuild from memory — this is the minimum, not the maximum
  0 extra   Third resource unlocked only if mistake log proves first two failed
```

> **If you are still reading after 25 minutes, close the tab and produce something.** Understanding from reading does not transfer to timed competition output. Cold production does.

---

## Red Flag List — Check Every Sunday

These are the specific failure modes most likely to appear given the shape of this plan:

- **Reading instead of rebuilding.** If you spent more time reading than producing from memory today, that session was low-ROI.
- **Polishing GAN or UNet code.** Aim for literacy, not craft. A working skeleton earns full credit. A beautiful one wastes time.
- **Chasing architecture breadth.** Every hour on ViT / LoRA / Score SDEs is an hour not spent on a 3rd attention-from-memory repetition.
- **Under-practicing reasoning sections.** The 2026 format awards Markdown reasoning. If you have not written 3+ reasoning cells this week, you are behind.
- **Not timing derivations.** "I know this" ≠ "I can produce this cold in 8 minutes." Timed production is the only test that matters.
- **Conflating understanding with production.** You can explain attention perfectly and still fail to implement it under pressure. Rebuild counts; recall alone does not.

---

## Core Principle

Optimized for highest-leverage gaps, not a survey of the entire syllabus. Everything is organized around four score pillars — the categories that convert into points on competition day.

Every PyTorch exercise runs on Colab with GPU enabled. No exceptions.

> **Depth beats breadth. Lock in the few concepts most likely to convert into points.**

---

## 2026 Syllabus Blind Spots — Fix These First

These five gaps were identified against the 2026 USAAIO/IOAI syllabus. Each one is a real point-scoring opportunity that the base plan did not fully address.

### Gap 1 — Kernel Validity: Mercer Closure Proofs

The syllabus explicitly requires proving PSD and kernel closure — not just stating it.

**Formula to know cold:**
```
Mercer's Condition: K is valid iff ∀z: z^T K z ≥ 0 (K is positive semi-definite)
```

**Three closure proofs to drill (each from memory):**
- **Sum:** If K₁ and K₂ are valid kernels, then K = K₁ + K₂ is valid
- **Product:** If K₁ and K₂ are valid kernels, then K = K₁ · K₂ is valid
- **Exponential:** If K is a valid kernel, then K' = exp(K(x,x')) is valid
- Know that RBF = exp(−||x−x'||²/2σ²) is valid and why

**Added to: Thu Mar 26 (45-min dedicated proof block)**

---

### Gap 2 — PAC Learning & Generalization Bounds

The plan covered Hoeffding in isolation. The syllabus requires connecting it to the generalization bound.

**Formula to memorize:**
```
P(R(f̂ₙ) ≥ ε) ≤ |H| · e^(−nε)
```

**Derivation chain to know:** Hoeffding → Union Bound → PAC Bound

**Practice:** Given n=1000, |H|=100, what confidence can you claim on error ≤ 0.1?

**Added to: Wed Mar 25 (30-min addition to the probability block)**

---

### Gap 3 — CLIP / InfoNCE Contrastive Loss

The 2026 syllabus adds CLIP-style contrastive learning as a required architecture.

**Formula:**
```
InfoNCE: L = −(1/N) Σ log [exp(sim(zᵢ,tᵢ)/τ) / Σⱼ exp(sim(zᵢ,tⱼ)/τ)]
```

**What to know:**
- CLIP architecture: image encoder (ViT) + text encoder (Transformer) → shared latent space
- InfoNCE loss: for N image-text pairs, maximize similarity of N correct pairs, minimize N²−N incorrect
- Temperature parameter τ: controls how peaked the distribution is
- Why this is cross-entropy over similarity scores, not a reconstruction loss

**Primary source:** [CLIP paper (Radford et al. 2021)](https://arxiv.org/abs/2103.00020) — Section 2 only (3 pages)

**Added to: Sun Mar 15 (30-min block)**

---

### Gap 4 — Stable Diffusion: VAE Decoder + Text Conditioning

The plan covered diffusion conceptually but missed two specific SD components the 2026 syllabus tests.

**Full SD pipeline to know cold:**
```
CLIP text encoder → UNet (cross-attention on text embeddings) → VAE decoder → pixel output
```

**What to know:**
- **VAE Decoder role:** Diffusion happens in *latent space*, not pixel space. VAE encoder compresses the image; VAE decoder maps the denoised latent back to pixels. Know why this is computationally cheaper.
- **Text conditioning:** Text prompt → CLIP embeddings → injected into UNet via cross-attention in residual blocks. Noisy latent is Q; text embeddings are K and V.

**Primary source:** [LDM paper (Rombach et al. 2022)](https://arxiv.org/abs/2112.10752) — Figure 3 + Section 3.3 only

**Added to: Wed Mar 18 (diffusion day)**

---

### Gap 5 — Reasoning Section Drill (2026 Format Change)

The 2026 format heavily emphasizes Markdown reasoning in Colab text cells. Graders look for the *why* behind architectural and loss function choices — not just working code.

**The 10-Minute Reasoning Section Protocol** (add to every Phase 4 coding task):

After every implementation, write a Colab Markdown cell answering:
- *Why this loss function?* (e.g., BCE vs. MSE for VAE — BCE treats pixels as Bernoulli; MSE assumes Gaussian)
- *Why this weight initialization?* (e.g., Xavier vs. Kaiming — which for ReLU vs. sigmoid and why)
- *Why this optimizer / learning rate?*
- *What would break if you changed X?*

**Key examples to practice:** BCE vs MSE in VAE · Adam vs SGD for transformers · LayerNorm vs BatchNorm position · Why temperature scaling in attention

**Added to: All Phase 4 coding drills**

---

## The 4 Score Pillars

**Pillar A — Transformer Mastery**
- Derive scaled dot-product attention cleanly
- Explain multi-head attention, positional encoding, residuals, layer norm
- Implement a transformer encoder block from memory
- Understand masking and decoder structure conceptually
- Know Flash Attention conceptually: IO-aware recomputation; why standard attention is memory-bandwidth bound

**Pillar B — Generative AI Mastery**
- Autoencoder vs VAE vs GAN vs diffusion: know the purpose and differences
- Derive ELBO at a usable competition level
- Implement a minimal VAE from memory
- Explain GAN objective and mode collapse
- Explain DDPM/stable diffusion conceptually; implement UNet architecture
- ★ CLIP: InfoNCE loss, dual-encoder architecture, temperature τ
- ★ SD pipeline: CLIP encoder → UNet (cross-attention) → VAE decoder

**Pillar C — Math / Derivation Fluency**
- Softmax + cross-entropy gradient
- Backprop through linear layers, activation, normalization at a usable level
- Vector projections, norms, orthogonality, matrix shape discipline
- SVM dual and kernel validity at proof level
- ★ Mercer closure proofs: sum, product, exp of valid kernels
- ★ PAC learning bound: P(R(f̂ₙ) ≥ ε) ≤ |H|·e^(−nε)
- Hoeffding / concentration style applications

**Pillar D — Competition Execution**
- Solve under time pressure
- Write clear markdown/LaTeX explanations
- ★ Reasoning sections: explain *why* behind every architecture and loss choice
- Complete full-task pipelines (data → train → evaluate → save → predict) on GPU
- Avoid shape mistakes, algebra slips, and vague reasoning

---

## What to Deprioritize Until After Round 2

- Full ViT training runs (light conceptual review only during spring break)
- Full GPT pretraining from scratch
- BPE from scratch beyond basic conceptual understanding
- Full DDPM from-scratch implementation (conceptual + UNet is enough)
- Object detection details
- Multi-modal pipelines (light review only if time permits)
- Kernel PCA from scratch
- Any topic that is not a likely score multiplier

---

## Daily Non-Negotiables

**Every day:**
1. **10 min** — PyTorch / NumPy / linear algebra flash review (no docs, no autocomplete)
2. **20 min** — One handwritten derivation or proof fragment (builds the exact muscle Round 2 tests)
3. **Main block** — One deep topic only
4. **5 min** — Log mistakes with a **fix action** in the taxonomy (category + what you will do tonight to fix it)

**Every weekend:**
- One timed implementation drill (no docs)
- One timed theory/writeup drill

---

## Phase 1: Transformers + Linear Algebra (March 7–13) — 7 days

This is the #1 priority. The 2025 Round 2 had a problem titled "Attention is all you need." The webinar confirms "build an attention module from scratch" is a test pattern.

### Sat March 7 — ✅ COMPLETED
**Scaled dot-product attention from first principles**
- ✅ Attention formula, Q/K/V meaning, dot-product similarity, softmax role, √d_k scaling
- ✅ Numerical attention examples (dot products → softmax → weighted sum)
- ✅ Interpreting attention weights and output as contextualized embeddings

---

### Sun March 8 — ✅ COMPLETED
**Multi-head attention + positional encoding**
- ✅ Multi-head attention: parallel heads, projection matrices W_i^Q/K/V, concatenation, W^O
- ✅ Why multi-head improves expressiveness while remaining efficient
- ✅ d_head = d_model / h relationship

---

### Mon March 9 — ✅ COMPLETED (conceptual) → TODAY: Timed implementation
**Full encoder block — from understanding to production**
- ✅ Encoder structure, residual connections, layer norm, FFN, tensor shape flow already understood
- ✅ Pre-norm vs post-norm conceptually understood
- ✅ PyTorch fundamentals: nn.Module, nn.Linear, ReLU, training loop, CrossEntropyLoss, backprop
- **TODAY (1.5 hrs):** Since conceptual understanding is already solid, accelerate to timed production:
  - Study nanoGPT model.py (~300 lines) for 25 min — focus on implementation patterns, not concepts
  - 45-min timed encoder block implementation from memory on GPU (attention + MHA + residual + LN + FFN)
  - Verify forward pass shape correctness
  - Log any implementation gaps in mistake taxonomy

**Resources for today:**
- [nanoGPT model.py (Karpathy)](https://github.com/karpathy/nanoGPT) — ~300 lines, read in full; directly competition-relevant
- [PyTorch Transformer Building Blocks](https://docs.pytorch.org/tutorials/intermediate/transformer_building_blocks.html) — modern official reference for custom attention layers

---

### Tue March 10 — School (1.5 hrs)
**Masking + decoder concepts**
- Implement causal mask (upper triangular) for autoregressive decoding
- Understand difference between: encoder self-attention, masked self-attention, cross-attention
- Understand why cross-attention uses encoder output for K, V
- Small coding drill for mask creation only — full decoder implementation is nice-to-have

**Resources for today:**
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — decoder section
- [TransformerLens](https://github.com/neelnanda-io/TransformerLens) — visualize attention patterns; useful for debugging intuition

---

### Wed March 11 — School (1.5 hrs)
**Attention gradients on paper**
- Derive ∂L/∂Q, ∂L/∂K, ∂L/∂V for scaled dot-product attention by hand
- Focus on correctness, not elegance
- Write up in LaTeX in Colab markdown cell, timed (practice competition format)
- This is a likely theory question — be able to reproduce under pressure

**Resources for today:**
- [CS231n Backprop Notes](https://cs231n.github.io/optimization-2/) — chain rule, staged computation, gradient intuition
- [Roger Grosse: Backpropagation Notes](https://www.cs.toronto.edu/~rgrosse/courses/csc421_2019/readings/L04%20Backpropagation.pdf) — Jacobians, vector chain rule, computational graphs
- [MatrixCalculus.org](https://www.matrixcalculus.org/) — verify after, not before
- [KaTeX Reference](https://katex.org/docs/supported.html) — fastest LaTeX symbol lookup mid-drill

---

### Thu March 12 — School (1.5 hrs)
**Softmax + CE gradient derivation + backprop through linear layers**
- ✅ Linear algebra foundations already solid (dot product, projections, eigenvalues, norms)
- **REPURPOSED:** Since linear algebra repair is no longer needed, use this day for the highest-value math gap remaining:
  - Derive softmax + cross-entropy gradient combined (the clean simplification: ŷ - y)
  - MSE vectorized gradient derivation
  - Chain rule through affine layer: ∂L/∂W, ∂L/∂b, ∂L/∂x for y = Wx + b
  - This is content originally scheduled for March 24 — pulling it forward since linear algebra is done

**Resources for today:**
- [CS231n Backprop Notes](https://cs231n.github.io/optimization-2/) — chain rule, staged computation
- [Roger Grosse: Backpropagation Notes](https://www.cs.toronto.edu/~rgrosse/courses/csc421_2019/readings/L04%20Backpropagation.pdf) — Jacobians
- [MatrixCalculus.org](https://www.matrixcalculus.org/) — verify after, not before

---

### Fri March 13 — School (1.5 hrs)
**Timed transformer drill [REP 1 — attention from memory]**
- 45-minute no-doc implementation:
  - Required: attention + MHA + residual + LN + FFN
  - Embeddings and positional encoding optional
- Then 30-minute written explanation of each component
- If you can't finish: identify exactly what tripped you up and redo those pieces
- **Note:** This is REP 1. Today's implementation is the second attempt (after the Mon March 9 accelerated drill). Quality and speed should both improve.

**Resources for today (check after, not during):**
- [nanoGPT model.py](https://github.com/karpathy/nanoGPT) — benchmark your implementation
- [Karpathy: micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) — if backprop felt shaky, do this next
- [FlashAttention Paper](https://arxiv.org/abs/2205.14135) — read conceptual overview; know IO-aware recomputation trick

---

## Phase 2: Generative Models (March 14–20) — 7 days

The single largest explicit gap. The USAAIO syllabus has an entire section on generative AI. Focus on the highest-yield parts.

### Sat March 14 — Weekend (3–4 hrs)
**Autoencoder + VAE**
- Build vanilla autoencoder on MNIST: encoder → bottleneck → decoder (reconstruction loss: MSE or BCE)
- Extend to VAE: encoder outputs μ and log-variance
- Understand reparameterization trick: z = μ + σ * ε where ε ~ N(0,1) — why this is needed (gradient can't flow through sampling)
- All on GPU

**Resources for today:**
- [Auto-Encoding Variational Bayes (Kingma & Welling)](https://arxiv.org/abs/1312.6114) — primary source
- [Lilian Weng: From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) — clearest ELBO derivation; better than most textbooks
- [PyTorch VAE Example](https://github.com/pytorch/examples/tree/main/vae) — study before timed rebuild

---

### Sun March 15 — Weekend (3–4 hrs)
**ELBO derivation + VAE from memory + CLIP intro**
- **Morning (2 hrs):** Derive log p(x) ≥ E_q[log p(x|z)] - KL(q(z|x) || p(z)) on paper
  - Understand each term: reconstruction loss + KL regularization
  - Know: CE loss ↔ NLL, MSE ↔ Gaussian assumption, KL divergence formula
  - Write one full clean derivation in markdown/LaTeX
- **Afternoon (1 hr):** 30–45 minute timed VAE from memory. Forward pass, sampling, loss, training loop.
- **★ CLIP (30 min):** Read CLIP paper Section 2 only (3 pages):
  - Dual-encoder architecture: ViT image encoder + Transformer text encoder → shared latent space
  - InfoNCE loss formula and temperature τ
  - Why this is cross-entropy over similarity scores, not reconstruction loss

**Resources for today:**
- [Lilian Weng: From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) — ELBO deep dive
- [CLIP Paper — Section 2 only](https://arxiv.org/abs/2103.00020) — 3 pages maximum
- [PyTorch VAE Example](https://github.com/pytorch/examples/tree/main/vae)

---

### Mon March 16 — School (1.5 hrs)
**GAN fundamentals**
- Implement simple GAN on MNIST: generator (noise → image), discriminator (image → real/fake)
- Minimax objective: min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]
- Understand mode collapse — why it happens
- Know conceptually: Wasserstein distance and why WGAN helps stability

**Resources for today:**
- [Generative Adversarial Nets (Goodfellow et al.)](https://arxiv.org/abs/1406.2661) — primary source
- [Lilian Weng: From GAN to WGAN](https://lilianweng.github.io/posts/2017-08-20-gan/) — exactly the depth competition questions probe
- [PyTorch DCGAN Tutorial](https://docs.pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html) — official; good for instability exposure
- [GAN Hacks (Soumith)](https://github.com/soumith/ganhacks) — practical training stability fixes

---

### Tue March 17 — School (1.5 hrs)
**GAN implementation practice**
- Minimal MNIST GAN or pseudo-code level if time is tight
- Goal is literacy: explain training alternation (train D, freeze G; then train G, freeze D)
- Experience instability firsthand — that's the point

**Resources for today:**
- [PyTorch-GAN repo (eriklindernoren)](https://github.com/eriklindernoren/PyTorch-GAN) — clean minimal variants
- [GAN Hacks](https://github.com/soumith/ganhacks)
- [Gradient Clipping (torch.nn.utils.clip_grad_norm_)](https://pytorch.org/docs/stable/generated/torch.nn.utils.clip_grad_norm_.html) — know for training stability

---

### Wed March 18 — School (1.5 hrs)
**Diffusion models — conceptual + SD architecture**
- Forward noising process: x_t = √(ᾱ_t) * x_0 + √(1-ᾱ_t) * ε
- Reverse denoising process: learn to predict the noise ε given x_t and t
- Noise prediction loss: ||ε - ε_θ(x_t, t)||²
- UNet role as the denoising network
- ★ **Full SD pipeline to know cold:**
  - CLIP text encoder → UNet (cross-attention on text embeddings) → VAE decoder → pixel output
  - VAE encoder compresses image to latent; diffusion happens in latent space; VAE decoder maps back to pixels
  - Text conditioning: noisy latent is Q, CLIP text embeddings are K and V in UNet cross-attention blocks
- No full DDPM training loop implementation required

**Resources for today:**
- [Denoising Diffusion Probabilistic Models (Ho et al.)](https://arxiv.org/abs/2006.11239) — primary source
- [LDM Paper (Rombach et al.) — Figure 3 + §3.3 only](https://arxiv.org/abs/2112.10752) — SD pipeline and text conditioning
- [Lilian Weng: What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) — best bridge from VAE/GAN to diffusion
- [CMU 11-785 Diffusion Slides](https://deeplearning.cs.cmu.edu/F23/document/slides/lec18.diffusion.pdf) — cleanest slide-form DDPM walkthrough

---

### Thu March 19 — School (1.5 hrs)
**UNet skeleton + skip-connection shape verification**
- Implement UNet **skeleton only**: encoder (conv + downsample) → bottleneck → decoder (upsample + skip concat)
- Goal: verify skip-connection shapes match and forward pass runs on GPU — *not a polished implementation*
- Stop when it works at a basic level. Log any shape errors immediately.
- UNet is on the syllabus as the backbone of diffusion models — literacy is enough, craft is not

**Resources for today:**
- [OpenAI Improved Diffusion (UNet arch)](https://github.com/openai/improved-diffusion) — focus on UNet architecture file only; adapt for MNIST scale
- [Hugging Face Diffusers: Basic Training](https://huggingface.co/docs/diffusers/en/tutorials/basic_training) — minimal UNet + scheduler code
- [PyTorch Tensor View Semantics](https://pytorch.org/docs/stable/tensor_view.html) — most common source of shape bugs; read once

---

### Fri March 20 — School (1.5 hrs)
**Timed generative review**
- 25-minute VAE rebuild from memory (no docs)
- 20-minute written compare/contrast:
  - AE vs VAE (what does the KL term buy you?)
  - VAE vs GAN (explicit density vs implicit density)
  - GAN vs diffusion (one-shot vs iterative generation)
- 15-minute GAN objective + instability explanation in LaTeX

**Resources for today:**
- [Lilian Weng: From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/)
- [Lilian Weng: From GAN to WGAN](https://lilianweng.github.io/posts/2017-08-20-gan/)
- [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) — for comparison tables under pressure
- [KaTeX Reference](https://katex.org/docs/supported.html)

---

## Phase 3: Classical ML + Proof-Heavy Topics (March 21–27) — 7 days

Not in E-82 at all. The syllabus explicitly says "prove whether a matrix is a valid kernel." These topics convert directly into points.

### Sat March 21 — Weekend (3–4 hrs)
**SVM fundamentals + implementation**
- Max-margin classifier: find the hyperplane that maximizes distance to nearest points
- Hinge loss: max(0, 1 - y * f(x))
- Support vectors: only the points on the margin matter
- Soft-margin SVM: C parameter trades off margin width vs. misclassification
- Implement soft-margin SVM from scratch in NumPy/PyTorch (gradient descent on hinge loss). Not using sklearn.

**Resources for today:**
- [CS229 SVM Notes](https://cs229.stanford.edu/notes2021fall/cs229-notes3.pdf) — primary source
- [CS229 Full Lecture Notes (2022)](https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf) — single PDF reference for all classical ML

---

### Sun March 22 — Weekend (3–4 hrs)
**SVM dual + Lagrangian + KKT depth**
- Derive the dual formulation via Lagrange multipliers
- Understand why the dual is useful: the kernel trick only works in dual form
- ★ **KKT depth:** Know exactly why α_i > 0 only for support vectors (complementary slackness condition). This is a direct competition derivation question.
- Focus on deriving structure, not memorizing every symbol

**Resources for today:**
- [CS229 SVM Notes — KKT section](https://cs229.stanford.edu/notes2021fall/cs229-notes3.pdf)
- [CS229 Full Lecture Notes](https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf)
- [MatrixCalculus.org](https://www.matrixcalculus.org/)

---

### Mon March 23 — School (1.5 hrs)
**Kernel trick + kernel validity proofs (Mercer's condition)**
- Kernel trick: K(x, y) = φ(x) · φ(y) without computing φ
- Common kernels: linear, polynomial, RBF
- **Prove a kernel is valid:** show the Gram matrix is PSD (z^T K z ≥ 0 for all z)
- ★ **Three closure proofs to drill from memory:**
  - Sum of two valid kernels is valid
  - Product of two valid kernels is valid
  - exp(K(x,x')) of a valid kernel is valid
- Know that RBF = exp(−||x−x'||²/2σ²) is valid and why

**Resources for today:**
- [CS229 Kernel Methods Notes](https://cs229.stanford.edu/notes2021fall/cs229-notes3.pdf)

---

### Tue March 24 — School (1.5 hrs)
**Backprop deepening + batch norm gradient (MOVED: core softmax+CE gradient pulled to March 12)**
- ✅ Softmax + CE gradient, MSE gradient, and affine layer chain rule moved to March 12 (linear algebra day was freed up)
- **REPURPOSED:** Use this day for deeper backprop that builds on the March 12 foundation:
  - Batch norm gradient derivation (forward: normalize, scale, shift; backward: chain through running stats)
  - Attention gradient review: re-derive ∂L/∂Q, ∂L/∂K, ∂L/∂V from March 11, timed (should be faster now)
  - If batch norm gradient is solid, practice one full backprop through a 2-layer net end-to-end on paper

**Resources for today:**
- [Goodfellow Deep Learning Book — Ch. 6](https://deeplearningbook.org/contents/mlp.html) — batch norm gradient examples
- [CS231n Backprop Notes](https://cs231n.github.io/optimization-2/)
- [Karpathy: micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) — if anything still feels shaky
- [MatrixCalculus.org](https://www.matrixcalculus.org/) — verify after

---

### Wed March 25 — School (1.5 hrs)
**Probability / concentration inequalities + PAC bounds**
- Hoeffding's inequality: statement, proof sketch, application — must be cold-recallable
- Chebyshev's inequality quick review
- ★ **PAC learning (30-min addition):**
  - Derive: P(R(f̂ₙ) ≥ ε) ≤ |H| · e^(−nε)
  - Derivation chain: Hoeffding → Union Bound → PAC Bound
  - Practice: given n=1000, |H|=100, what confidence on error ≤ 0.1?
  - Understand what n, |H|, and ε each control
- One or two additional Hoeffding application drills

**Resources for today:**
- [CMU Probability / Concentration Notes](https://www.cs.cmu.edu/~odonnell/papers/probability-concentration-notes.pdf)
- [MIT 6.435 PAC Learning Notes (Jaakkola)](https://web.mit.edu/6.435/www/Jaakkola03.pdf) — cleanest PAC derivation from Hoeffding + union bound
- [Bandit Algorithms (Lattimore & Szepesvári) — Ch. 6](https://banditalgs.com/) — connects Hoeffding to ML generalization
- [Concentration Inequalities (Boucheron et al.) — Ch. 2](https://www.google.com/books/edition/Concentration_Inequalities/koNqWRluhP0C) — rigorous Hoeffding proofs

---

### Thu March 26 — School (1.5 hrs)
**Timed proof day + Mercer kernel closure [REP 1 — kernel/PAC proofs]**
- 20 min: kernel validity proofs from memory — PSD definition + all three closure cases
- 20 min: ELBO derivation sketch
- 20 min: attention gradient explanation (∂L/∂Q, ∂L/∂K, ∂L/∂V)
- 20 min: backprop gradient sketch
- Honest assessment: which proofs are locked in, which need another pass

**Resources for today:**
- [CS229 SVM/Kernel Notes](https://cs229.stanford.edu/notes2021fall/cs229-notes3.pdf)
- [MatrixCalculus.org](https://www.matrixcalculus.org/)
- [KaTeX Reference](https://katex.org/docs/supported.html)

---

### Fri March 27 — School (1.5 hrs)
**Convex optimization + review**
- Convex sets and functions: definition, examples, how to verify
- Gradient descent convergence: why convexity guarantees global minimum
- KKT conditions worked examples — connect back to SVM dual
- Light review of any Phase 1–3 weak spots from mistake log

**Resources for today:**
- [CS229 Full Lecture Notes](https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf)
- [CMU Probability / Concentration Notes](https://www.cs.cmu.edu/~odonnell/papers/probability-concentration-notes.pdf)

---

## Phase 4: Spring Break Intensive (March 28 – April 3) — 7 days

**SPRING BREAK — No school. Full days available (3–4 hrs each).**

This is the highest-leverage week. Use it for implementation drills, full-task pipelines, competition simulation, and closing any remaining gaps. This week alone adds ~20+ hours vs. the school-day schedule.

### Sat March 28 — Spring Break (3–4 hrs)
**Past-problem diagnostic**
- Take one past Round 2 style task or equivalent (forum.beaver-edge.ai, IOAI 2024 Scientific Round)
- Simulate time pressure exactly
- Diagnose exact failure modes — map each failure to the mistake taxonomy
- This sets the agenda for the rest of spring break

**Resources for today:**
- [USAAIO Official Site](https://usaaio.org/) — check for any released Round 2 guidance
- [IOAI 2024 Past Problems](https://ioai-official.org/past-problems) — Scientific Round; multi-step reasoning focus
- [Papers With Code SOTA](https://paperswithcode.com/sota) — sanity-check architecture knowledge

---

### Sun March 29 — Spring Break (3–4 hrs)
**Full-task drill #1 — Tabular classification pipeline**
- **Morning (1.5 hrs):** Download a tabular dataset (UCI or Kaggle). Full pipeline in 90 minutes, no docs:
  - `pd.read_csv()` → explore → handle missing values → encode categoricals → normalize → train/val split → PyTorch model → train on GPU → evaluate (accuracy, F1, AUC-ROC) → `torch.save()` → generate predictions
- **Afternoon (1.5 hrs):** Redo on a different dataset, targeting 75 minutes. Speed matters.
- ★ **Reasoning section (10 min):** Write a Colab Markdown cell explaining: why this loss function, why this optimizer, what would break if you changed the loss from CE to MSE.

**Resources for today:**
- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [Kaggle PyTorch MNIST Pipeline Template](https://www.kaggle.com/code/robikscube/pytorch-mnist-beginner-tutorial) — ready-to-adapt
- [PyTorch CUDA Notes](https://docs.pytorch.org/docs/stable/notes/cuda.html)
- [TorchMetrics Library](https://lightning.ai/docs/torchmetrics/stable) — quick AUC-ROC/F1 without reinventing metrics

---

### Mon March 30 — Spring Break (3–4 hrs)
**Math repair day + attention repetition [REP 2 — attention + kernel/PAC from memory]**
- Use mistake log only for math repairs. No new topics.
- **Morning (2 hrs):** Proof drills:
  - PAC bound derivation from memory (Hoeffding → union bound → PAC)
  - Chebyshev applications on 2–3 novel problems
  - Mercer closure proofs from memory (sum, product, exp) — second repetition
- **Afternoon (1.5 hrs):** Attention from memory, target 35 min, no docs. Then matrix calculus: redo any derivations from Phase 3 that weren't clean.

**Resources for today:**
- [MatrixCalculus.org](https://www.matrixcalculus.org/)
- [MIT PAC Learning Notes](https://web.mit.edu/6.435/www/Jaakkola03.pdf)
- [The Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)

---

### Tue March 31 — Spring Break (3–4 hrs)
**Full-task drill #2 — Image classification pipeline**
- **Morning (1.5 hrs):** CIFAR-10 or similar. Full pipeline in 90 minutes, no docs:
  - load with torchvision → transforms → DataLoader → build CNN → train on GPU → save model → predict
  - Practice batch size tradeoffs for GPU memory. `torch.cuda.empty_cache()` if OOM.
- **Afternoon (1.5 hrs):** Review all proofs done so far — write each from memory in LaTeX in Colab, timed:
  - Attention gradients (∂L/∂Q, ∂L/∂K, ∂L/∂V)
  - ELBO derivation for VAE
  - Kernel validity — Mercer + three closure proofs
  - SVM dual via Lagrangian + KKT (why α_i > 0 only for support vectors)
  - Hoeffding → PAC bound derivation chain
- ★ **Reasoning section (10 min):** Explain weight init choice (Xavier vs Kaiming, which for ReLU vs sigmoid and why) and why LayerNorm position (pre vs post) matters.

**Resources for today:**
- [Google Colab GPU Guide](https://colab.research.google.com/notebooks/gpu.ipynb)
- [PyTorch Tensor View Semantics](https://pytorch.org/docs/stable/tensor_view.html)
- [KaTeX Reference](https://katex.org/docs/supported.html)

---

### Wed April 1 — Spring Break (3–4 hrs)
**Mixed simulation + kernel/PAC repetition [REP 2 — kernel/PAC + REP 3 — attention]**
- **45 min:** Coding — transformer encoder OR VAE from memory (choose whichever was weaker in drills)
- **30 min:** Theory writeup — derivation + explanation of the architecture you just built
- **★ 30 min:** Kernel closure + PAC bound from scratch, timed — second repetition block for both
- **★ Reasoning section (10 min):** Explain Adam vs SGD for transformer training, and why temperature scaling matters in attention
- **15 min:** Light NLP review: BERT masked LM and GPT autoregressive objectives (conceptual only)

**Resources for today:**
- [nanoGPT (Karpathy)](https://github.com/karpathy/nanoGPT) — benchmark after, not during
- [PyTorch VAE Example](https://github.com/pytorch/examples/tree/main/vae)
- [HF: BERT Masked Language Modeling](https://huggingface.co/docs/transformers/en/tasks/masked_language_modeling) — conceptual only

---

### Thu April 2 — Spring Break (3–4 hrs)
**Weak spot blitz + attention repetition [REP 3 — attention from memory, tight time]**
- **Morning (2 hrs):** Redo implementations under tighter time:
  - Transformer encoder from memory (target: 40 min) — third repetition, no notes
  - VAE from memory (target: 25 min)
  - Simple GAN from memory (target: 25 min)
- **Afternoon (1.5 hrs):** Practice reasoning explanations in Colab Markdown — 2026 format may require submitted reasoning. Do 2–3 practice explanations: justify architecture choice, walk through derivation, justify hyperparameter decisions.
- Only redo the two weakest areas from mistake log. No new content.

**Resources for today:**
- [torch.autograd.gradcheck](https://pytorch.org/docs/stable/autograd.html#torch.autograd.gradcheck) — verify custom gradient implementations in <3 lines
- [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables)

---

### Fri April 3 — Spring Break (3–4 hrs)
**Full competition simulation — the dress rehearsal**

3-hour timed session simulating Round 2 conditions exactly:
- Problem 1: Theory derivation in LaTeX (attention gradients or probability proof) — **45 min**
- Problem 2: From-scratch model implementation (transformer encoder or VAE) — **60 min**
- Problem 3: Full-task pipeline (data → trained model → predictions on GPU) — **75 min**

No docs, no AI tools, GPU enabled, Colab environment.

**After the simulation (30 min):** Honest debrief. What's locked in? What's shaky? If anything is shaky, do one final targeted review. Then stop.

**Evening:** Light review only. Re-read the competition-day protocol above. Pack for MIT. Sleep by 10pm. The work is done.

**Resources for today:**
- [USAAIO Official Site](https://usaaio.org/)
- [Google Colab GPU Guide](https://colab.research.google.com/notebooks/gpu.ipynb)

---

## Sat April 4 — Competition Day at MIT

The plan stops mattering today. Execution is what remains.

**Night before (Apr 3 evening):** No new content. Review mistake log once. Prepare: laptop, charger, Colab GPU confirmed. Have a `.py` backup of encoder block, VAE skeleton, and training loop stub ready to paste if session drops. Sleep by 10pm.

**Morning warm-up:** 15-min attention derivation on paper. Do not review anything new. Arrive early and confirm GPU environment before the clock starts.

### Tactical Time Split

| Phase | Instruction |
|-------|-------------|
| **First** | Read the entire problem set before writing a single line. Identify where the points are concentrated. |
| **Order** | Start with what you know best — not Problem #1. Bank partial credit early. |
| **Theory** | Write assumptions, define variables, show all derivation steps even if incomplete. Partial credit is real. |
| **Code** | Write a shape table before every tensor operation. If code fails after 10 min of debugging, switch to explanation + pseudocode immediately — explanation credit exists. |
| **Stuck** | Write your assumptions and what you would do next. Graders award method points. A blank page earns nothing. |
| **Writeup** | Reserve 10–15 min per problem for clean Markdown reasoning. This is where differentiation points live. |
| **Colab** | Know how to reconnect and reload in under 60 seconds if session drops. Test this during the Apr 3 simulation. |

> Score is the sum of mechanics repeated until automatic. There is nothing to discover on competition day. Execute what is already built.

---

## Competition-Week Checklist

### Must-Have
- [ ] Derive scaled dot-product attention from scratch
- [ ] Explain multi-head attention, positional encoding, residuals, layer norm
- [ ] Implement transformer encoder block from memory (target: 45 min)
- [ ] Implement VAE from memory (target: 30 min)
- [ ] Explain GAN objective + training instability + mode collapse
- [ ] Explain diffusion forward/reverse process and noise prediction loss
- [ ] Derive or explain ELBO cleanly
- [ ] Derive softmax + cross-entropy gradient
- [ ] Prove basic kernel validity: PSD definition + sum/product/exp closure proofs
- [ ] Explain SVM dual at a clean high level + why α_i > 0 only for support vectors
- [ ] Derive PAC bound: P(R(f̂ₙ) ≥ ε) ≤ |H|·e^(−nε) from Hoeffding + union bound
- [ ] Debug tensor shape errors quickly
- [ ] Complete a full-task pipeline in 75 min on GPU
- [ ] Write readable markdown/LaTeX explanations under time pressure
- [ ] Write reasoning sections: explain *why* behind loss, init, optimizer choices
- [ ] Comfortable with GPU workflow: `.to(device)`, batch sizing, OOM handling

### Nice-to-Have
- [ ] Decoder implementation details (causal mask, cross-attention)
- [ ] ViT overview (patches → transformer encoder → classification)
- [ ] BERT/GPT objective familiarity
- [ ] ★ CLIP: InfoNCE loss, dual-encoder architecture, temperature τ
- [ ] ★ Stable Diffusion: VAE decoder role + text conditioning via cross-attention in UNet
- [ ] Flash Attention conceptual understanding (IO-aware recomputation)
- [ ] LoRA: rank decomposition ΔW = BA, know when and why to use it
- [ ] UNet skip connections implemented
- [ ] Implement simple GAN from memory (target: 30 min)

### Not Required for This Round's Core Prep
- Polished DDPM training + sampling implementation
- Object detection mechanics (IoU, NMS, anchor boxes)
- Multi-modal pipeline fluency
- BPE tokenization from scratch
- Advanced pretrained fine-tuning workflows
- Kernel PCA from scratch

---

## Mistake Taxonomy

Log every miss with a **category** and a **fix action**. No passive journaling — if you can't write a fix action, you haven't diagnosed the mistake.

| Category | What It Means | Fix Strategy | Example Fix Action |
|----------|---------------|--------------|-------------------|
| **Conceptual** | Did not know the idea | Primary paper/note → rebuild from memory | "Read ELBO derivation, then redo from scratch 2× tonight" |
| **Derivation** | Knew it but couldn't derive cleanly | Write it out 3× from memory, timed | "Redo attention gradients cold in 8 min, three times" |
| **Algebra** | Sign / norm / projection / arithmetic error | Slow down; check with MatrixCalculus.org after | "Write shape table before every matmul, no exceptions" |
| **Shape** | Tensor dimensions wrong | Write full shape table before every matmul | "Add shape assert after every layer for next 3 drills" |
| **Coding** | Syntax / PyTorch mechanics | nanoGPT / PyTorch docs; never guess syntax | "Read PyTorch View Semantics once, then rebuild" |
| **Explanation** | Understood but explained vaguely | Write one clean paragraph; repeat with timer | "Write kernel closure explanation in Markdown, time to 5 min" |
| **Time** | Knew it but too slow | Timed drill with 10% less time than last attempt | "Next encoder drill: 40 min cap instead of 45" |

**The goal is not to study more. The goal is to make this log shrink.**

---

## Master Resource List

### Pillar A — Transformers
| Resource | Use |
|----------|-----|
| [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | Primary source |
| [The Annotated Transformer (Harvard)](https://nlp.seas.harvard.edu/2018/04/03/attention.html) | Line-by-line PyTorch implementation |
| [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) | Visual intuition |
| [Karpathy: Let's Build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) | Best visceral cement for attention |
| [nanoGPT (Karpathy)](https://github.com/karpathy/nanoGPT) | ~300 lines; read model.py in full |
| [Karpathy: micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0) | Fix shaky backprop |
| [PyTorch Transformer Building Blocks](https://docs.pytorch.org/tutorials/intermediate/transformer_building_blocks.html) | Official modern reference |
| [LabML Annotated Transformer](https://labml.ai/annotated_pytorch/paper/implementations/transformer) | Alt view on positional encodings + masking |
| [TransformerLens](https://github.com/neelnanda-io/TransformerLens) | Visualize attention patterns |
| [FlashAttention Paper](https://arxiv.org/abs/2205.14135) | Conceptual: IO-aware recomputation |

### Pillar B — Generative AI
| Resource | Use |
|----------|-----|
| [Auto-Encoding Variational Bayes (Kingma)](https://arxiv.org/abs/1312.6114) | VAE primary source |
| [PyTorch VAE Example](https://github.com/pytorch/examples/tree/main/vae) | Study before timed rebuild |
| [Lilian Weng: From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) | Best ELBO derivation |
| [Generative Adversarial Nets (Goodfellow)](https://arxiv.org/abs/1406.2661) | GAN primary source |
| [Lilian Weng: From GAN to WGAN](https://lilianweng.github.io/posts/2017-08-20-gan/) | Minimax → Wasserstein |
| [PyTorch DCGAN Tutorial](https://docs.pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html) | GAN literacy |
| [GAN Hacks](https://github.com/soumith/ganhacks) | Training stability |
| [DDPM Paper (Ho et al.)](https://arxiv.org/abs/2006.11239) | Diffusion primary source |
| [Lilian Weng: What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) | VAE/GAN → diffusion bridge |
| [CMU 11-785 Diffusion Slides](https://deeplearning.cs.cmu.edu/F23/document/slides/lec18.diffusion.pdf) | Cleanest DDPM slide walkthrough |
| [CLIP Paper — Section 2 only](https://arxiv.org/abs/2103.00020) | InfoNCE, dual-encoder (★ syllabus gap) |
| [LDM Paper — Figure 3 + §3.3 only](https://arxiv.org/abs/2112.10752) | SD pipeline + text conditioning (★) |
| [OpenAI Improved Diffusion (UNet arch)](https://github.com/openai/improved-diffusion) | Runnable UNet code |
| [HF Diffusers: Basic Training](https://huggingface.co/docs/diffusers/en/tutorials/basic_training) | UNet + schedulers quickstart |

### Pillar C — Math / Derivation Fluency
| Resource | Use |
|----------|-----|
| [CS231n Backprop Notes](https://cs231n.github.io/optimization-2/) | Chain rule, staged computation |
| [Roger Grosse: Backpropagation Notes](https://www.cs.toronto.edu/~rgrosse/courses/csc421_2019/readings/L04%20Backpropagation.pdf) | Jacobians, vector chain rule |
| [CS229 SVM / Kernel Notes](https://cs229.stanford.edu/notes2021fall/cs229-notes3.pdf) | SVM dual, KKT, kernels |
| [CS229 Full Lecture Notes (2022)](https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf) | Single PDF for all classical ML |
| [MatrixCalculus.org](https://www.matrixcalculus.org/) | Verify gradients after; not before |
| [The Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf) | Navigate fast; don't memorize |
| [MIT 18.06 Strang (OCW)](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/) | Lectures 14–20: projections, least squares |
| [3Blue1Brown Linear Algebra](https://www.3blue1brown.com/topics/linear-algebra) | Fast intuition repair |
| [MIT 6.435 PAC Learning Notes](https://web.mit.edu/6.435/www/Jaakkola03.pdf) | PAC bound derivation (★ syllabus gap) |
| [CMU Probability / Concentration Notes](https://www.cs.cmu.edu/~odonnell/papers/probability-concentration-notes.pdf) | Hoeffding proofs and drills |
| [Bandit Algorithms Ch. 6 (Lattimore)](https://banditalgs.com/) | Hoeffding → ML generalization |
| [Concentration Inequalities (Boucheron) Ch. 2](https://www.google.com/books/edition/Concentration_Inequalities/koNqWRluhP0C) | Rigorous Hoeffding proofs |
| [Goodfellow Deep Learning — Ch. 6](https://deeplearningbook.org/contents/mlp.html) | Backprop + batch norm gradient |
| [Overleaf Math Expressions Guide](https://www.overleaf.com/learn/latex/Mathematical_expressions) | LaTeX repair |

### Pillar D — Competition Execution
| Resource | Use |
|----------|-----|
| [PyTorch CUDA Notes](https://docs.pytorch.org/docs/stable/notes/cuda.html) | Device placement, GPU behavior |
| [PyTorch Tensor View Semantics](https://pytorch.org/docs/stable/tensor_view.html) | #1 source of shape bugs; read once |
| [Gradient Clipping](https://pytorch.org/docs/stable/generated/torch.nn.utils.clip_grad_norm_.html) | GAN/transformer training stability |
| [torch.autograd.gradcheck](https://pytorch.org/docs/stable/autograd.html#torch.autograd.gradcheck) | Verify custom gradients in <3 lines |
| [Google Colab GPU Guide](https://colab.research.google.com/notebooks/gpu.ipynb) | Setup, device transfer, memory checks |
| [Kaggle Datasets](https://www.kaggle.com/datasets) | MNIST, CIFAR-10, tabular datasets |
| [Kaggle PyTorch MNIST Pipeline](https://www.kaggle.com/code/robikscube/pytorch-mnist-beginner-tutorial) | Ready-to-adapt pipeline template |
| [TorchMetrics Library](https://lightning.ai/docs/torchmetrics/stable) | AUC-ROC / F1 without reinventing |
| [KaTeX Reference](https://katex.org/docs/supported.html) | Fastest LaTeX symbol lookup |
| [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) | Comparison tables under pressure |
| [USAAIO Official Site](https://usaaio.org/) | Round 2 guidance, problem formats |
| [IOAI 2024 Past Problems](https://ioai-official.org/past-problems) | Scientific Round; multi-step reasoning |
| [Papers With Code SOTA](https://paperswithcode.com/sota) | Calibrate architecture knowledge |

### Nice-to-Have Coverage
| Resource | Use |
|----------|-----|
| [ViT Paper (Dosovitskiy et al.)](https://arxiv.org/abs/2010.11929) | Patch embeddings; read intro + Fig 1 only |
| [HF: BERT Masked LM Guide](https://huggingface.co/docs/transformers/en/tasks/masked_language_modeling) | BERT objectives; conceptual only |
| [LoRA Paper (Hu et al.)](https://arxiv.org/abs/2106.09685) | ΔW = BA rank decomposition; one paragraph |

---

## Low-ROI Extras — Do Not Open Until All Must-Have Items Are Green

These are **not active study items**. They exist as reference only. Every hour spent here is an hour not spent rebuilding from memory.

| Resource | Status | If you open it… |
|----------|--------|-----------------|
| FlashAttention paper | Low probability bonus | Read the abstract only. Know: attention is memory-bandwidth bound, not compute-bound. Close it. |
| TransformerLens | Near-zero point probability | Interesting, not testable at this level. Skip. |
| Score-Based SDEs (Song et al.) | Only if diffusion goes beyond DDPM | Not during prep window. |
| LoRA paper | Bonus knowledge | One sentence: ΔW = BA where r ≪ d. That's it. |
| ViT paper | Nice-to-have only | Read Fig 1 and first paragraph. Stop. |
| Papers With Code SOTA | Do not touch | Ecosystem browsing. Zero scoring payoff. |
| OpenAI Improved Diffusion repo | Only if UNet skeleton is already solid | Full repo study is a time sink. |
| HF BERT tutorial | 10-min max | Conceptual only during Apr 1 NLP review. |

**Rule:** If a resource does not directly help you derive, implement, or explain under time pressure, it is a distraction this month.

---

## Priority Summary — If Time Gets Squeezed

1. **Transformer derivation + encoder implementation** (Pillar A)
2. **VAE / GAN / diffusion conceptual mastery + UNet** (Pillar B)
3. **Backprop + matrix calculus + linear algebra cleanup** (Pillar C)
4. **SVM dual + kernel proofs + Mercer closure** (Pillar C)
5. **PAC bound derivation** (Pillar C)
6. **Full-task pipeline speed on GPU** (Pillar D)
7. **Timed simulations + reasoning sections** (Pillar D)
8. **CLIP + SD conditioning** (nice-to-have that could become must-have)
9. **Everything else**

---

## Changelog

| Date | Change | Reasoning |
|------|--------|-----------|
| March 7, 2026 | Initial plan created | Based on Reid_USAAIO_R2_Gap_Analysis_v5_FINAL |
| March 7, 2026 | Merged with accuracy-first revision | Compressed Phase 1 from 9→7 days; moved DDPM to conceptual-only; added mistake taxonomy and daily derivation practice; cut ViT/BPE/BERT/multi-modal from core; kept UNet and full-task pipeline drills; restructured spring break for diagnostic-first approach |
| March 7, 2026 | Enhanced with AI audit (Gemini + Grok + Claude) | Added 5 syllabus blind spots (Mercer closure proofs, PAC learning bound, CLIP/InfoNCE, SD text conditioning, Reasoning Section drill); added per-day resource links; added Gold Medal goal; expanded mistake taxonomy fix strategies; added Master Resource List with 50+ curated links; added Priority Order item for PAC bounds and CLIP |
| March 7, 2026 | Structural revision (ChatGPT audit) | Added Score Conversion Map; added Resource Time Cap hard rules; added Red Flag List; lightened UNet from full build to skeleton + shape drill; added explicit REP labels for attention (×3) and kernel/PAC proof (×2) repetition blocks; expanded Mistake Taxonomy with Example Fix Action column; replaced Low-ROI extras with gated table; replaced inspirational competition-day framing with tactical time-split protocol |
| March 9, 2026 | Progress update: marked completed topics from study sessions | Reid covered: attention (scaled dot-product, multi-head, Q/K/V, softmax, √d_k), transformer architecture (encoder, residuals, LN, FFN, shape flow), linear algebra foundations (dot product, projections, eigenvalues), PyTorch fundamentals (nn.Module, training loop, CrossEntropyLoss, backprop), softmax/probabilities. Marked March 7–8 as completed. Accelerated March 9 from conceptual to timed implementation. Repurposed March 12 (linear algebra repair no longer needed) → softmax+CE gradient derivation + backprop through affine layers (pulled from March 24). Repurposed March 24 → batch norm gradient + attention gradient review. Net effect: ~3 hours reclaimed from redundant review, redirected to higher-value derivation practice. |

---

*Last updated: March 9, 2026*
*Maintained by: David Sendroff*
*Round 1: 107 (Honor Roll) — actual performance: High Honor Roll level (Problem #5 grading error by organizers)*
*Round 2 goal: 🥇 Gold Medal*
