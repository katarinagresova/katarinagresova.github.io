---
title: Research
eyebrow: What I work on
subtitle: >-
  Sequence models of RNA regulation, the interpretability problem that comes
  with them, and the benchmarks that decide whether any of it is real.
permalink: /research/
---
A cell's genome is the same in every one of its cells, and yet cells do wildly
different things. Much of that difference is decided after transcription — on
the RNA. Which transcripts get silenced, which get bound, which get translated
and how often. My work is about reading those decisions out of sequence:
building models that take an RNA sequence and predict what the cell will do
with it.

## Learning the rules of RNA targeting

I started on small RNAs. A microRNA is about twenty-two nucleotides long and
it finds its targets in a transcriptome of tens of millions — a
needle-in-haystack problem that the field long approximated with seed-match
rules. Those rules are useful and also wrong often enough to matter. Deep
learning on high-throughput binding data does better, and I've built models
that learn the binding preferences directly from the data rather than from the
rules we assumed.

The same shape of problem recurs for RNA-binding proteins, where the practical
obstacle is different: for most proteins there are only a few thousand known
sites, far too few to train on from scratch. We showed that transfer learning
carries a surprising amount across proteins, which makes the long tail of
poorly-characterised RBPs tractable.

## Getting models to say why

A model that predicts binding accurately but cannot say what it noticed is a
poor instrument. If the point is to learn biology, and not just to rank
candidates, the model has to be interpretable in terms a biologist can argue
with.

Attribution methods give you a per-nucleotide importance score, but a score
per position is not yet a motif or a rule. So I built a method that aligns
attribution profiles across many sequences, which makes the recurring patterns
a model has learned visible as patterns — something you can compare against
known biology, and occasionally something that suggests biology nobody had
written down.

## Benchmarks, and the reason I keep coming back to them

Every result above depends on a comparison being fair, and in genomics they
frequently are not. Datasets carry structure nobody intended: class imbalances
that a model can exploit without learning anything, frequency biases that let
a classifier memorise which molecules are common rather than which sequences
bind, train/test splits that leak. A model that exploits an artefact posts a
beautiful number and teaches you nothing.

So a recurring thread in my work is building the datasets and the evaluation
the field can actually stand on: curated collections with sensible splits and
honest baselines, and benchmarks designed specifically to remove the biases
that inflate published scores. Genomic Benchmarks and miRBench both came out
of that, and both install in one line. It is unglamorous work. It is also the
part that decides whether anything else in the field is true.

Lately that thread has turned into its own project: rather than curate one
more clean dataset, check the one you already have. Genomic Benchmarks QC
scores a genomic dataset for the shortcuts a classifier could exploit — length
differences between classes, composition biases, per-position give-aways,
duplicate sequences, near-duplicate leakage between train and test — and hands
back a pass/warning/fail report you can read, or a CSV you can put in CI. It
is the most useful thing I have built, because it generalises the complaint
instead of answering it once.

## A detour through protein structure

For a couple of years I worked on the structure side of the problem instead:
adapting pretrained networks to embed protein structures so that similarity
search across the whole of AlphaFold DB — over 200 million predicted
structures — becomes fast enough to be interactive rather than an overnight
job. It runs as a public web service called AlphaFind. Different molecule,
same instinct: learn a representation good enough that the expensive
comparison becomes cheap.

## Ageing, and what changes in the RNA

A fellowship at the National Institute on Aging, part of the NIH, pushed me
toward a different question — not how one RNA finds its target, but what the
whole population of transcripts does as a tissue ages. Senescent cells, which
stop dividing but refuse to die, accumulate with age and are stubbornly hard
to identify: there is no single marker that reliably picks them out. Long-read
single-cell sequencing helps, because it reports isoforms rather than genes,
and a cell can hold a gene's expression level steady while changing which
isoform it makes entirely.

So I built classifiers for senescent cells from that kind of data, and went
looking for the markers that hold across cell types rather than in one — work
that ended up in *Molecular Cell*. It is noisy and inconvenient, and a useful
corrective to the tidiness of a benchmark.

## Now: how much protein, and why

My current work moves from binding to output — from *which* RNAs are regulated
to *how much*. What is it about an mRNA's own sequence that sets how much
protein a cell makes from it, and how does that change as cells age, stall or
break down? This means working from ribosome-level measurements, and asking
what parts of a transcript's own sequence explain the differences we see.

It's the same question that runs through everything above, asked one step
further along: given a sequence, what does the cell do with it — and can we
model that well enough to be believed?

## How I work

Reproducibly and in the open — as a principle, not a habit I happened to pick
up. I was a software engineer before I was a scientist, and what I took from
those years is the conviction that computational biology should be borrowing
far more from software engineering than it does. Version control, tests,
packaged code, pinned environments, an analysis that runs on a machine that
isn't mine: none of it is exotic, and all of it is the difference between a
result and a result somebody else can check.

So most of what I build ends up as a package, a dataset or a workflow someone
else can install and run — usually the difference between a method that gets
used and a method that gets cited once. I hold the students I supervise to the
same standard, because it is much easier to work this way from the start than
to reconstruct it the week before a submission.

The same conviction produces most of my teaching — a three-day deep learning
course, a crash course in molecular biology written for computer scientists, a
set of tutorials on the computational skills a science degree leaves out. The
bottleneck in computational biology is rarely the idea. More often it's that
nobody ever showed anyone how to run the thing.

The things that came out of all this are listed on the
[building page]({{ '/building/' | relative_url }}), and the courses on the
[teaching page]({{ '/teaching/' | relative_url }}).
