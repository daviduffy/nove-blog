---
title: "Photographer Contact Form Strategy"
date: 2018-10-23T15:45:10+00:00
author: david
featured: true
categories: best_practices
tags: photography analytics
blurb: My wife and I shoot weddings together -- she's the main and I second shoot. My background is in web development, and last year during a redesign of her site I did a deep dive into contact form strategy. We’ve seen dramatic results, and I wanted to share and start a dialog that can help people revisit their contact form strategy.
read_duration: 11
---
<!-- 

## Here ya go:

- Require the basics
- Opt for structure rather than ambiguity
- Opt for more fields (within reason) rather than less
- Keep the 'visual commitment' low
- Avoid 'gotchas' and hurdles
- Here's my wife's contact form!
 -->
​

We did a pretty significant redesign/rebrand of my wife’s site in 2017. During the redesign, it occurred to me that the fields in the contact form were just kind of "there." We had given the contact form a passing thought, but had not strategized that deeply about what we were asking for from potential clients.

## 1. Require the basics

This is super basic stuff: name and email are always in every form. My wife offers a few types of photography so we have a 'type' dropdown where the user can select what they’re looking for (wedding photos, senior photos, etc). Right next to that there's a field for the date, which uses a date picker. Referral source is next, and from an analytics standpoint that's just as important as the rest of the data mentioned so far, so that’s required too. It’s visibly evident when a field is required, so people hopefully aren't surprised by an error message saying, "Hey, please fill out field ___" after they press submit.

## 2. Opt for structure rather than ambiguity
This principle could be re-written as, "avoid using the 'details' part of the form to ask for any specific data." Basically, if there is a piece of data (like the event date) that I can reasonably expect to get, I'm going to provide a field for that. It also means the only method for contacting us is the contact form itself -- we don’t put an actual email address anywhere on the site.

I want the data from an inquiry in the most structured format possible, so that I can turn around and feed that into our analytics and get the best profile possible for each inquiry. There is still a need for a catch-all 'details' field -- that's where a client's personality and excitement will shine through -- but I provide the appropriate structure so that I'm getting all of the info I need from the rest of the form.

## 3. Opt for more fields (within reason) rather than less
When I was planning for my own wedding, my wife and I were super excited about it. In retrospect, we probably talked people's ears off about it. I assume that potential clients have a similar amount of excitement and energy, and are likely to fill out the whole form even if some of the questions aren't required, or are a little more probing (like asking about estimated budget). Even (and especially) if they don't book, we still need to have a clear picture of what kind of clients we are attracting. With the right analytics tools, we can actually start to see trends like:

*    {:.p}  "people usually book within ___ dollars of what they enter for estimated budget", and
*    {:.p}  "___% of inquiries fill out all of the fields even if they aren't required".

I feel like there's a fine line here, though. Even an excited couple can be overwhelmed by a contact form that's jammed with too many questions. That's why I group and collapse all fields that aren’t required into an accordion element.

## 4. Keep the 'visual commitment' low
I want people to be able to scan the contact form page when it loads, and judge that there won’t be too much work involved in filling it out. The fields that are required are marked so you know you'll have to fill those out, and the "more fields" section that I mentioned before gets tucked away into an accordion. Those fields aren't required, and although I know the user will probably still fill them out, I want to exclude them from the initial mental calculation about how many fields they'll have to fill out to complete the form.

I also opted to put 'type' and 'date' on the same row. They're closely related, so their proximity to one another isn't surprising, and putting them side-by-side instead of stacking them eliminates an extra row from the form. On first scan, it looks like less to fill out.

Notice that there’s tension here with the “Opt for more fields” principle: I want to ask for info, but I don't want to stuff the drawer with too many extra elements. If the user expands the accordion and finds that the form has suddenly doubled in size, that is pretty lame user experience. The fields that I can really justify including are found here, but I still have to be careful not to overdo it.

## 5. Avoid 'gotchas' and hurdles
This is really about eliminating friction as the user gets closer to pressing 'submit.' The fields in the accordion are pretty transparently not required, so provided there aren't too many fields in there I don't consider it a 'gotcha'. There are really just two other hurdles: a required field might be empty, and the entry in email might not be a real email. For both of these, I do my best to validate the user input and present any errors to the user before they press submit. This helps give feedback before the critical moment.

There are other hurdles I could eliminate as well. For example, I could store the text that a user has entered before they press submit in their browser, so that if for some reason they refresh the page before submitting, they don’t have to fill out the form again.

## 6. Now what?
From 2017 to 2018 my wife and I have seen a 66% increase in inquiries, and our conversion percentage has stayed the same. There are a lot of uncontrolled variables here -- we did a site rebrand after all -- but I think the changes to the contact form had a profound impact.
<!-- 
I'd love to hear and see what you guys are doing with your contact forms. I can also share a little more about Nove, the tool I used to create my wife’s contact form. It’s a side project of mine that anyone can use for free. -->