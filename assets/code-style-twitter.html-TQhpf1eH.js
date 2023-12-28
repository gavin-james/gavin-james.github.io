const e=JSON.parse(`{"key":"v-4a5192c2","path":"/develop/quality-assurance/code-style/code-style-twitter.html","title":"Twitter Java Style Guide","lang":"zh-CN","frontmatter":{"date":"2022-02-05T00:00:00.000Z","category":["代码规范"],"tag":["代码规范"],"description":"Twitter Java Style Guide 本文是Twitter的Java代码规范。 The intention of this guide is to provide a set of conventions that encourage good code. It is the distillation of many combined man-years of software engineering and Java development experience. While some suggestions are more strict than others, you should always practice good judgement.","head":[["meta",{"property":"og:url","content":"http://www.gavin-james.com/develop/quality-assurance/code-style/code-style-twitter.html"}],["meta",{"property":"og:site_name","content":"Gavin James"}],["meta",{"property":"og:title","content":"Twitter Java Style Guide"}],["meta",{"property":"og:description","content":"Twitter Java Style Guide 本文是Twitter的Java代码规范。 The intention of this guide is to provide a set of conventions that encourage good code. It is the distillation of many combined man-years of software engineering and Java development experience. While some suggestions are more strict than others, you should always practice good judgement."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-27T08:55:11.000Z"}],["meta",{"property":"article:author","content":"gavin-james"}],["meta",{"property":"article:tag","content":"代码规范"}],["meta",{"property":"article:published_time","content":"2022-02-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-27T08:55:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Twitter Java Style Guide\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-27T08:55:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"gavin-james\\",\\"url\\":\\"http://www.gavin-james.xyz\\"}]}"]]},"headers":[{"level":2,"title":"Formatting","slug":"formatting","link":"#formatting","children":[{"level":3,"title":"Use line breaks wisely","slug":"use-line-breaks-wisely","link":"#use-line-breaks-wisely","children":[]},{"level":3,"title":"Indent style","slug":"indent-style","link":"#indent-style","children":[]},{"level":3,"title":"No tabs","slug":"no-tabs","link":"#no-tabs","children":[]},{"level":3,"title":"100 column limit","slug":"_100-column-limit","link":"#_100-column-limit","children":[]},{"level":3,"title":"CamelCase for types, camelCase for variables, UPPER_SNAKE for constants","slug":"camelcase-for-types-camelcase-for-variables-upper-snake-for-constants","link":"#camelcase-for-types-camelcase-for-variables-upper-snake-for-constants","children":[]},{"level":3,"title":"No trailing whitespace","slug":"no-trailing-whitespace","link":"#no-trailing-whitespace","children":[]}]},{"level":2,"title":"Field, class, and method declarations","slug":"field-class-and-method-declarations","link":"#field-class-and-method-declarations","children":[]},{"level":2,"title":"Variable naming","slug":"variable-naming","link":"#variable-naming","children":[{"level":3,"title":"Extremely short variable names should be reserved for instances like loop indices.","slug":"extremely-short-variable-names-should-be-reserved-for-instances-like-loop-indices","link":"#extremely-short-variable-names-should-be-reserved-for-instances-like-loop-indices","children":[]},{"level":3,"title":"Include units in variable names","slug":"include-units-in-variable-names","link":"#include-units-in-variable-names","children":[]},{"level":3,"title":"Don't embed metadata in variable names","slug":"don-t-embed-metadata-in-variable-names","link":"#don-t-embed-metadata-in-variable-names","children":[]}]},{"level":2,"title":"Space pad operators and equals.","slug":"space-pad-operators-and-equals","link":"#space-pad-operators-and-equals","children":[]},{"level":2,"title":"Be explicit about operator precedence","slug":"be-explicit-about-operator-precedence","link":"#be-explicit-about-operator-precedence","children":[]},{"level":2,"title":"Documentation","slug":"documentation","link":"#documentation","children":[{"level":3,"title":"\\"I'm writing a report about...\\"","slug":"i-m-writing-a-report-about","link":"#i-m-writing-a-report-about","children":[]},{"level":3,"title":"Documenting a class","slug":"documenting-a-class","link":"#documenting-a-class","children":[]},{"level":3,"title":"Documenting a method","slug":"documenting-a-method","link":"#documenting-a-method","children":[]},{"level":3,"title":"Be professional","slug":"be-professional","link":"#be-professional","children":[]},{"level":3,"title":"Don't document overriding methods (usually)","slug":"don-t-document-overriding-methods-usually","link":"#don-t-document-overriding-methods-usually","children":[]},{"level":3,"title":"Use javadoc features","slug":"use-javadoc-features","link":"#use-javadoc-features","children":[]}]},{"level":2,"title":"Imports","slug":"imports","link":"#imports","children":[{"level":3,"title":"Import ordering","slug":"import-ordering","link":"#import-ordering","children":[]},{"level":3,"title":"No wildcard imports","slug":"no-wildcard-imports","link":"#no-wildcard-imports","children":[]}]},{"level":2,"title":"Use annotations wisely","slug":"use-annotations-wisely","link":"#use-annotations-wisely","children":[{"level":3,"title":"@Nullable","slug":"nullable","link":"#nullable","children":[]},{"level":3,"title":"@VisibleForTesting","slug":"visiblefortesting","link":"#visiblefortesting","children":[]}]},{"level":2,"title":"Use interfaces","slug":"use-interfaces","link":"#use-interfaces","children":[{"level":3,"title":"Leverage or extend existing interfaces","slug":"leverage-or-extend-existing-interfaces","link":"#leverage-or-extend-existing-interfaces","children":[]}]},{"level":2,"title":"Fakes and mocks","slug":"fakes-and-mocks","link":"#fakes-and-mocks","children":[]},{"level":2,"title":"Let your callers construct support objects","slug":"let-your-callers-construct-support-objects","link":"#let-your-callers-construct-support-objects","children":[]},{"level":2,"title":"Testing multithreaded code","slug":"testing-multithreaded-code","link":"#testing-multithreaded-code","children":[]},{"level":2,"title":"Testing antipatterns","slug":"testing-antipatterns","link":"#testing-antipatterns","children":[{"level":3,"title":"Time-dependence","slug":"time-dependence","link":"#time-dependence","children":[]},{"level":3,"title":"The hidden stress test","slug":"the-hidden-stress-test","link":"#the-hidden-stress-test","children":[]},{"level":3,"title":"Thread.sleep()","slug":"thread-sleep","link":"#thread-sleep","children":[]}]},{"level":2,"title":"Avoid randomness in tests","slug":"avoid-randomness-in-tests","link":"#avoid-randomness-in-tests","children":[]},{"level":2,"title":"Defensive programming","slug":"defensive-programming","link":"#defensive-programming","children":[{"level":3,"title":"Avoid assert","slug":"avoid-assert","link":"#avoid-assert","children":[]},{"level":3,"title":"Preconditions","slug":"preconditions","link":"#preconditions","children":[]},{"level":3,"title":"Minimize visibility","slug":"minimize-visibility","link":"#minimize-visibility","children":[]},{"level":3,"title":"Favor immutability","slug":"favor-immutability","link":"#favor-immutability","children":[]},{"level":3,"title":"Be wary of null","slug":"be-wary-of-null","link":"#be-wary-of-null","children":[]},{"level":3,"title":"Clean up with finally","slug":"clean-up-with-finally","link":"#clean-up-with-finally","children":[]}]},{"level":2,"title":"Clean code","slug":"clean-code","link":"#clean-code","children":[{"level":3,"title":"Disambiguate","slug":"disambiguate","link":"#disambiguate","children":[]},{"level":3,"title":"Remove dead code","slug":"remove-dead-code","link":"#remove-dead-code","children":[]},{"level":3,"title":"Use general types","slug":"use-general-types","link":"#use-general-types","children":[]},{"level":3,"title":"Always use type parameters","slug":"always-use-type-parameters","link":"#always-use-type-parameters","children":[]},{"level":3,"title":"Stay out of Texas在新窗口打开","slug":"stay-out-of-texas在新窗口打开","link":"#stay-out-of-texas在新窗口打开","children":[]},{"level":3,"title":"Avoid typecasting","slug":"avoid-typecasting","link":"#avoid-typecasting","children":[]},{"level":3,"title":"Use final fields","slug":"use-final-fields","link":"#use-final-fields","children":[]},{"level":3,"title":"Avoid mutable static state","slug":"avoid-mutable-static-state","link":"#avoid-mutable-static-state","children":[]},{"level":3,"title":"Exceptions","slug":"exceptions","link":"#exceptions","children":[]}]},{"level":2,"title":"Use newer/better libraries","slug":"use-newer-better-libraries","link":"#use-newer-better-libraries","children":[{"level":3,"title":"StringBuilder over StringBuffer","slug":"stringbuilder-over-stringbuffer","link":"#stringbuilder-over-stringbuffer","children":[]},{"level":3,"title":"ScheduledExecutorService over Timer","slug":"scheduledexecutorservice-over-timer","link":"#scheduledexecutorservice-over-timer","children":[]},{"level":3,"title":"List over Vector","slug":"list-over-vector","link":"#list-over-vector","children":[]}]},{"level":2,"title":"and hashCode()","slug":"and-hashcode","link":"#and-hashcode","children":[]},{"level":2,"title":"Premature optimization is the root of all evil.","slug":"premature-optimization-is-the-root-of-all-evil","link":"#premature-optimization-is-the-root-of-all-evil","children":[]},{"level":2,"title":"TODOs","slug":"todos","link":"#todos","children":[{"level":3,"title":"Leave TODOs early and often","slug":"leave-todos-early-and-often","link":"#leave-todos-early-and-often","children":[]},{"level":3,"title":"Leave no TODO unassigned","slug":"leave-no-todo-unassigned","link":"#leave-no-todo-unassigned","children":[]},{"level":3,"title":"Adopt TODOs","slug":"adopt-todos","link":"#adopt-todos","children":[]}]},{"level":2,"title":"Obey the Law of Demeter (LoD在新窗口打开)","slug":"obey-the-law-of-demeter-lod在新窗口打开","link":"#obey-the-law-of-demeter-lod在新窗口打开","children":[{"level":3,"title":"In classes","slug":"in-classes","link":"#in-classes","children":[]},{"level":3,"title":"In methods","slug":"in-methods","link":"#in-methods","children":[]}]},{"level":2,"title":"Don't Repeat Yourself (DRY在新窗口打开)","slug":"don-t-repeat-yourself-dry在新窗口打开","link":"#don-t-repeat-yourself-dry在新窗口打开","children":[{"level":3,"title":"Extract constants whenever it makes sense","slug":"extract-constants-whenever-it-makes-sense","link":"#extract-constants-whenever-it-makes-sense","children":[]},{"level":3,"title":"Centralize duplicate logic in utility functions","slug":"centralize-duplicate-logic-in-utility-functions","link":"#centralize-duplicate-logic-in-utility-functions","children":[]}]},{"level":2,"title":"Manage threads properly","slug":"manage-threads-properly","link":"#manage-threads-properly","children":[]},{"level":2,"title":"Avoid unnecessary code","slug":"avoid-unnecessary-code","link":"#avoid-unnecessary-code","children":[{"level":3,"title":"Superfluous temporary variables.","slug":"superfluous-temporary-variables","link":"#superfluous-temporary-variables","children":[]},{"level":3,"title":"Unneeded assignment.","slug":"unneeded-assignment","link":"#unneeded-assignment","children":[]}]},{"level":2,"title":"The 'fast' implementation","slug":"the-fast-implementation","link":"#the-fast-implementation","children":[]}],"git":{"createdTime":1703667311000,"updatedTime":1703667311000,"contributors":[{"name":"gavin-james","email":"meaganlindesy1258@gmail.com","commits":1}]},"readingTime":{"minutes":18.85,"words":5655},"filePathRelative":"develop/quality-assurance/code-style/code-style-twitter.md","localizedDate":"2022年2月5日","excerpt":"<h1> Twitter Java Style Guide</h1>\\n<blockquote>\\n<p>本文是Twitter的Java代码规范。</p>\\n</blockquote>\\n<p>The intention of this guide is to provide a set of conventions that encourage good code. It is the distillation of many combined man-years of software engineering and Java development experience. While some suggestions are more strict than others, you should always practice good judgement.</p>","copyright":{"author":"gavin-james","license":"https://github.com/gavin-james/gavin-james.github.io/LICENSE"},"autoDesc":true}`);export{e as data};